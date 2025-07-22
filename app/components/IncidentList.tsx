/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import incIcon from "@/app/assets/incicon.png"
import gun from "@/app/assets/gun.png"
import unauth from "@/app/assets/unauthorized.png"
import Image from 'next/image';
import { CheckCheck, DoorOpen, FrownIcon, GuitarIcon, Plus, UserSearch } from 'lucide-react';


export default function IncidentList() {
    const qc = useQueryClient();
    const { data } = useQuery({
        queryKey: ['incidents', false],
        queryFn: () => axios.get('/api/incidents?resolved=false').then(r => r.data),
    });
    const { resolvedData } = useQuery({
        queryKey: ['incidents', true],
        queryFn: () => axios.get('/api/incidents?resolved=true').then(r => r.data),
    });
    console.log("resolvedData", resolvedData)

    const resolve = useMutation({
        mutationFn: (id: string) => axios.patch(`/api/incidents/${id}/resolve`),
        onMutate: async (id) => {
            await qc.cancelQueries(['incidents', false]);
            const prev = qc.getQueryData(['incidents', false]);
            qc.setQueryData(['incidents', false], (old: any[]) =>
                old.filter((i) => i.id !== id)
            );
            return { prev };
        },
        onError: (_, __, context: any) =>
            qc.setQueryData(['incidents', false], context.prev),
        onSettled: () => qc.invalidateQueries(['incidents', false]),
    });
    const testType = (type: string) => {
        if (type === "GUN_THREAT") {
            return <Image src={gun} alt="gun" />
        } else if (type === "UNAUTHORISED_ACCESS") {
            return <Image src={unauth} alt="unauthorized" />
        } else {
            return <UserSearch />
        }
    }

    // const counter = (data, check) => {
    //     if (!data) {
    //         return 0
    //     }
    //     const num = data.filter((inc: any) => inc.resolved === check).length
    //     return num
    // }

    return (
        <ul className="space-y-3 bg-gray-800">
            <div className="flex flex-row justify-between items-center p-2">
                <div className="flex flex-row"><Image src={incIcon} alt="incidents" /><h2>{data?.length || 0} Unresolved incidents</h2></div>
                <div className="flex flex-row justify-center align-middle content-center"><span className='flex flex-row pr-1 align-middle items-center'><DoorOpen size={16} /><Plus size={16} /><UserSearch size={16} /></span><h4 className='flex flex-row p-1 rounded-xl bg-[#0B0B0B] items-center pt-2'  ><CheckCheck size={14} />{resolvedData?.length || 0} resolved incidents</h4></div>
            </div>
            {!data ? (<div>
                <div className="flex flex-col items-center justify-center py-8">
                    <span className="text-gray-400">Loading incidents...</span>
                </div>
            </div>) : (
                data.length < 0 ? (
                    <div>no incident found </div>
                ) : (
                    data?.map((inc: any) => (
                        // console.log(inc)
                        <li
                            key={inc.id}
                            className="flex gap-3 p-2 rounded-lg bg-gray-800 items-center"
                        >
                            <Image src={inc.thumbnailUrl} width={100} height={100} alt="camera" className="w-12 h-12 rounded-lg" />
                            <div className="flex-1">
                                <p className="font-semibold text-sm flex flex-row pt-2 pb-2">{testType(inc.type)}{inc.type.replace('_', ' ')}</p>
                                <p className="text-xs text-gray-400">{inc.camera.location}</p>
                                <p className="text-xs text-gray-500">
                                    {new Date(inc.tsStart).toLocaleTimeString()}
                                </p>
                            </div>
                            <button
                                onClick={() => resolve.mutate(inc.id)}
                                className="text-xs px-2 py-1 bg-blue-600 rounded hover:bg-blue-500"
                            >
                                Resolve
                            </button>
                        </li>
                    ))
                )



            )
            }
        </ul >
    );
}