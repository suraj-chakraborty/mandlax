/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import incIcon from "@/app/assets/incicon.png"
import gun from "@/app/assets/gun.png"
import unauth from "@/app/assets/unauthorized.png"
import camera from "@/app/assets/cctv.png"
import Image from 'next/image';
import { CheckCheck, ChevronRight, DoorOpen, Plus, UserSearch } from 'lucide-react';

type Incident = {
    id: string;
    type: string;
    camera: {
        location: string;
    };
    thumbnailUrl: string;
    tsStart: string;
};

export default function IncidentList() {
    const qc = useQueryClient();
    const { data } = useQuery({
        queryKey: ['incidents', false],
        queryFn: () => axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/incidents?resolved=false`).then(r => r.data),
    });
    console.log("Data", data)
    const { data: resolvedData } = useQuery({
        queryKey: ['incidents', true],
        queryFn: () => axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/incidents?resolved=true`).then(r => r.data),
    });
    console.log("resolvedData", resolvedData)

    const resolve = useMutation({
        mutationFn: (id: string) => axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/incidents/${id}/resolve`),
        onMutate: async (id) => {
            await qc.cancelQueries(['incidents', false]);
            const prev = qc.getQueryData(['incidents', false]);
            qc.setQueryData(['incidents', false], (old: unknown[]) =>
                old.filter((i) => i.id !== id)
            );
            return { prev };
        },
        onError: (_, __, context: unknown) =>
            qc.setQueryData(['incidents', false], context.prev),
        onSettled: () => qc.invalidateQueries(['incidents', false]),
    });
    const testType = (type: string) => {
        if (type === "GUN_THREAT") {
            return <Image src={gun} alt="gun" width="auto" />
        } else if (type === "UNAUTHORISED_ACCESS") {
            return <Image src={unauth} alt="unauthorized" />
        } else {
            return <UserSearch size={16} />
        }
    }

    return (
        <ul className="space-y-2 bg-[#131313] overflow-y-scroll scrollbar-hide rounded-xl aspect-[14/7]">
            <div className=" sticky top-0 z-10 bg-black flex flex-row justify-between items-center p-2">
                <div className="flex flex-row gap-2"><Image src={incIcon} alt="incidents" /><h2>{data?.length || 0} Unresolved incidents</h2></div>
                <div className="flex flex-row justify-center align-middle content-center"><span className='flex flex-row pr-1 align-middle items-center'><DoorOpen size={16} /><Plus size={16} /><UserSearch size={16} /></span><h4 className='flex flex-row p-2 rounded-2xl bg-[#0B0B0B] items-center pt-2 '  ><CheckCheck size={14} />{resolvedData?.length || 0} resolved incidents</h4></div>
            </div>
            {!data ? (<div>
                <div className="flex flex-col items-center justify-center py-8">
                    <span className="text-gray-400">Loading incidents...</span>
                </div>
            </div>) : (
                data.length <= 0 ? (
                    <div className='flex justify-center align-middle' ><p>no incident found </p></div>
                ) : (
                    data?.map((inc: Incident) => (
                        // console.log(inc)
                        <li
                            key={inc.id}
                            className="flex gap-3 p-1 rounded-lg bg-[#131313] items-center"
                        >
                            <Image src={inc.thumbnailUrl} width={100} height={100} alt="camera" className="w-26 h-full rounded-lg" />
                            <div className="flex-1">
                                <p className="font-semibold text-sm flex flex-row pt-2 pb-2 gap-1.5">{testType(inc.type)}  {inc.type.replace('_', ' ')}</p>
                                <p className="text-xs text-gray-400 flex flex-row gap-1"><Image src={camera} alt="camera" width={20} height={20} />{inc.camera.location}</p>
                                <p className="text-xs text-gray-500">
                                    {new Date(inc.tsStart).toLocaleTimeString()}
                                </p>
                            </div>
                            <button
                                onClick={() => resolve.mutate(inc.id)}
                                className="text-xs px-2 py-1 text-amber-300 rounded hover:bg-amber-300 hover:text-amber-800 font-bold flex flex-row gap-1 align-middle justify-center "
                            >
                                Resolve <ChevronRight size={14} />
                            </button>
                        </li>
                    ))
                )



            )
            }
        </ul >
    );
}