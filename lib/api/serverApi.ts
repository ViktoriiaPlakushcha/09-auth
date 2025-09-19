import { headers } from "next/headers";
import { nextServer } from "./api";
import { type Note, type NoteTag } from '@/types/note';
import { CheckSessionRequest } from "@/types/api";
import { User } from "@/types/user";




interface FetchNotesProps {
    query?: string,
    tag?: NoteTag,
    currentPage: number,
    perPage?: number,
    
}

interface FetchNotesResponse {
    notes: Note[],
    totalPages: number,
}

interface FetchNoteByIdProps {
    id: string;
}

async function fetchNotesServer({ query, currentPage, tag }: FetchNotesProps): Promise<FetchNotesResponse> {
   const cookieHeader = (await headers()).get("cookie") ?? "";
    const params: {
    search?: string;
    tag?: NoteTag;
    page: number;
    perPage: number;
  } = {
    page: currentPage,
    perPage: 12,
    };
    
    if (query && query.trim()) params.search = query.trim();
    if (tag) params.tag = tag;


    const response = await nextServer.get<FetchNotesResponse>('/notes', {params,
    headers: cookieHeader ? { cookie: cookieHeader } : {},
  } )
    return response.data;
}

async function fetchNoteByIdServer({ id }: FetchNoteByIdProps): Promise<Note> {
   const cookieHeader = (await headers()).get("cookie") ?? "";
    const resp = await nextServer.get<Note>(`/notes/${id}`, {headers: cookieHeader ? { cookie: cookieHeader } : {}},)
    return resp.data;
}

async function checkSessionServer() {
  const cookieHeader = (await headers()).get("cookie") ?? "";
  const res = await nextServer.get<CheckSessionRequest>('/auth/session', {headers: cookieHeader ? { cookie: cookieHeader } : {}});
  return res;
};

async function getMeServer() { 
  const cookieHeader = (await headers()).get("cookie") ?? "";
    const { data } = await nextServer.get<User>('/users/me', {headers: cookieHeader ? { cookie: cookieHeader } : {}});
    return data;
}

export { fetchNotesServer, fetchNoteByIdServer, checkSessionServer, getMeServer };