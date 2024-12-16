import api from '@/config/Api';
import * as actionTypes from './ActionTypes';
// import { type } from 'os';


//make createIssue(data)
    //write the  createIssue(data) code for me 
    export const createIssue=(issueData)=>{ 
    return async (dispatch)=>{
        dispatch({type:actionTypes.CREATE_ISSUE_REQUEST});
        try {
            const response=await api.post(`/api/issues`,issueData);
            dispatch({type:actionTypes.CREATE_ISSUE_SUCCESS, issues:response.data});
            console.log(' issue created successfully',response.data)
        } catch (error) {
            dispatch({type:actionTypes.CREATE_ISSUE_FAILURE,error:error.message});
        }
    }

}

export const fetchIssues = (id) => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.FETCH_ISSUES_REQUEST });
        try {
        const response = await api.get(`/api/issues/project/${id}`);
        console.log('fetch issues', response.data);
        dispatch({ type: actionTypes.FETCH_ISSUES_SUCCESS, issues: response.data });
        } catch (error) {
        dispatch({ type: actionTypes.FETCH_ISSUES_FAILURE, error: error.message });
        }
    };
}

export const fetchIssueById=(id)=>{
    return async (dispatch)=>{
        dispatch({type:actionTypes.FETCH_ISSUES_BY_ID_REQUEST});
        try {
            const response=await api.get(`/api/issues/${id}`);
            console.log("fetch issue by id",response.data);
            dispatch({type:actionTypes.FETCH_ISSUES_BY_ID_SUCCESS,issues:response.data});
        } catch (error) {
            console.log("error",error);
            dispatch({type:actionTypes.FETCH_ISSUES_BY_ID_FAILURE,error:error.message});
        }
    }
}

export const updateIssueStatus=({id,status})=>{
    return async (dispatch)=>{
        dispatch({type:actionTypes.UPDATE_ISSUE_STATUS_REQUEST});
        try {
            const response=await api.put(`/api/issues/${id}/status/${status}`);
            console.log("update issue status",response.data);
            dispatch({type:actionTypes.UPDATE_ISSUE_STATUS_SUCCESS,issues:response.data});
        } catch (error) {
            // console.log("error",error);
            dispatch({type:actionTypes.UPDATE_ISSUE_STATUS_FAILURE,error:error.message});
        }
    }
}

export const assignedUserToIssue=({issueId,userId})=>{
    return async (dispatch)=>{
        dispatch({type:actionTypes.ASSIGNED_ISSUE_TO_USER_REQUEST});
        try {
            const response=await api.put(`/api/issues/${issueId}/addUser/${userId}`);
            console.log("assigned user ----",response.data);
            dispatch({type:actionTypes.ASSIGNED_ISSUE_TO_USER_SUCCESS,issue:response.data});
        } catch (error) {
            console.log("error",error);
            dispatch({type:actionTypes.ASSIGNED_ISSUE_TO_USER_FAILURE,error:error.message});
        }
    }
}

export const deleteIssue=(id)=>{
    return async (dispatch)=>{
        dispatch({type:actionTypes.DELETE_ISSUE_REQUEST});
        try {
            const response=await api.delete(`/api/issues/${id}`);
            console.log("delete issue",response.data);
            dispatch({type:actionTypes.DELETE_ISSUE_SUCCESS,issueId:id});
        } catch (error) {
            console.log("error",error);
            dispatch({type:actionTypes.DELETE_ISSUE_FAILURE,error:error.message});
        }
    }
}