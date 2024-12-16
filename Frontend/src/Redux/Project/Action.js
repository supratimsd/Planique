import api from "@/config/Api";
import { ACCEPT_INVITATION_REQUEST, ACCEPT_INVITATION_SUCCESS, CREATE_PROJECT_REQUEST, CREATE_PROJECT_SUCCESS, DELETE_PROJECT_REQUEST, DELETE_PROJECT_SUCCESS, FETCH_PROJECT_BY_ID_REQUEST, FETCH_PROJECT_BY_ID_SUCCESS, FETCH_PROJECTS_REQUEST, FETCH_PROJECTS_SUCCESS, INVITE_TO_PROJECT_FAILURE, INVITE_TO_PROJECT_REQUEST, INVITE_TO_PROJECT_SUCCESS, SEARCH_PROJECT_REQUEST, SEARCH_PROJECT_SUCCESS } from "./ActionTypes";


export const fetchProjects=({category,tag})=>async (dispatch)=>{
    dispatch({type:FETCH_PROJECTS_REQUEST});
    try {
        const {data}=await api.get("/api/projects",{params:{category,tag}})
        console.log("all projects",data);
        dispatch({type:FETCH_PROJECTS_SUCCESS,projects:data});
    } catch (error) {
        console.log("error",error);
    }
}


export const searchProjects=(keyword)=>async (dispatch)=>{
    dispatch({type:SEARCH_PROJECT_REQUEST});
    try {
        const {data}=await api.get("/api/projects/search?keyword="+keyword)
        console.log("search projects",data);
        dispatch({type:SEARCH_PROJECT_SUCCESS,projects:data});
    } catch (error) {
        console.log("error",error);
    }
}


export const fetchProjectById=(id)=>async (dispatch)=>{
    dispatch({type:FETCH_PROJECT_BY_ID_REQUEST});
    try {
        const {data}=await api.get("/api/projects/"+id)
        console.log("project",data);
        dispatch({type:FETCH_PROJECT_BY_ID_SUCCESS,project:data});
    } catch (error) {
        console.log("error",error);
    }
}



export const createProjects=(projectData)=>async (dispatch)=>{
    dispatch({type:CREATE_PROJECT_REQUEST});
    try {
        const {data}=await api.post("/api/projects",projectData)
        console.log("projects",data);
        dispatch({type:CREATE_PROJECT_SUCCESS,project:data});
    } catch (error) {
        console.log("error",error);
    }
}


export const deleteProject=({projectId})=>async (dispatch)=>{
    dispatch({type:DELETE_PROJECT_REQUEST});
    try {
        const {data}=await api.delete("/api/projects/"+projectId)
        console.log("delete projects",data);
        dispatch({type:DELETE_PROJECT_SUCCESS,projectId});
    } catch (error) {
        console.log("error",error);
    }
}


export const inviteToProject=({email,projectId})=>async (dispatch)=>{
    dispatch({type:INVITE_TO_PROJECT_REQUEST});
    try {
        const {data}=await api.post("/api/projects/invite",{email,projectId})
        console.log("invite  projects",data);
        dispatch({type:INVITE_TO_PROJECT_SUCCESS,payload:data});
    } catch (error) {
    //     console.log("error",error);
    //     dispatch({ 
    //         type: INVITE_TO_PROJECT_FAILURE, 
    //         payload: error.response?.data || { message: "Failed to invite user" }
    const errorMessage = error.response?.data?.message 
            || error.message 
            || "Failed to invite user";
        
        dispatch({ 
            type: INVITE_TO_PROJECT_FAILURE, 
            payload: {
                message: errorMessage,
                status: error.response?.status,
                // You can add more error details if needed
            } 
        });
    }
}


export const acceptInvitation=({token,navigate})=>async (dispatch)=>{
    dispatch({type:ACCEPT_INVITATION_REQUEST});
    try {
        const {data}=await api.get("/api/projects/accept_invitation",{
            params:{
                token
            }
        })
        navigate("/project/"+data.projectId);
        console.log("accept invitation",data);
        dispatch({type:ACCEPT_INVITATION_SUCCESS,payload:data});
    } catch (error) {
        console.log("error",error);
    }
}



