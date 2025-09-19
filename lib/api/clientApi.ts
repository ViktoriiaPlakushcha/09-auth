import { User } from "@/types/user";
import { type Note, type NoteTag, type NewNote } from "../../types/note";
import { nextServer } from "./api";
import { type RegisterRequest, type LoginRequest, type CheckSessionRequest } from "@/types/api";

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
 interface UpdateUserRequest {
  username?: string;
};


async function fetchNotes({ query, currentPage, tag }: FetchNotesProps): Promise<FetchNotesResponse> {
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


    const response = await nextServer.get<FetchNotesResponse>('/notes', {params})
    return response.data;
}

async function deleteNote(id: string): Promise<Note> {
    const deleteResponse = await nextServer.delete<Note>(`/notes/${id}`)
    return deleteResponse.data;
}

async function createNote(newNote: NewNote): Promise<Note> {
    const createResponse = await nextServer.post<Note>('/notes', newNote);
    return createResponse.data;
}

async function fetchNoteById({ id }: FetchNoteByIdProps): Promise<Note> {
    const resp = await nextServer.get<Note>(`/notes/${id}`)
    return resp.data;
}

async function register(data: RegisterRequest): Promise<User> {
    const resp = await nextServer.post<User>('/auth/register', data);
    return resp.data;
}

async function login(data: LoginRequest): Promise<User> {
    const resp = await nextServer.post<User>('/auth/login', data);
    return resp.data;
}


async function checkSession() {
  const res = await nextServer.get<CheckSessionRequest>('/auth/session');
  return res.data.success;
};

async function getMe(): Promise<User> {
    const { data } = await nextServer.get<User>('/users/me');
    return data;
}

async function logout(): Promise<void> {
    await nextServer.post('/auth/logout');
};

async function updateMe(payload: UpdateUserRequest): Promise<User> {
  const res = await nextServer.patch<User>('/users/me', payload);
  return res.data;
};

export { fetchNotes, deleteNote, createNote, fetchNoteById, register, login, checkSession, getMe, logout, updateMe};