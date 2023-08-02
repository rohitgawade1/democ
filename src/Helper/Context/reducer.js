import React, { useState, useReducer } from 'react';
import CryptoJS from "crypto-js";


if (sessionStorage.getItem("Gayatri")) {
	const storedData = sessionStorage.getItem("Gayatri");
	var bytes = CryptoJS.AES.decrypt(storedData, 'RangaFulan09');
	var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
	// console.log(decryptedData);
}


let token = decryptedData ? decryptedData.access_token : '';
let UserFullName = decryptedData? decryptedData.UserFullName: '';
let RoleID = decryptedData? decryptedData.RoleID: '';
let UserID = decryptedData? decryptedData.UserID: '';
let DepartmentID = decryptedData ? decryptedData.DepartmentID :'';
let DesignationID = decryptedData ? decryptedData.DesignationID :'';
let EmployeeID = decryptedData ? decryptedData.EmployeeID :'';
let ClientID = decryptedData ? decryptedData.EmployeeID :'';

export const initialState = {
	username: '' || UserFullName,
	RoleID : '' || RoleID,
	UserID : '' || UserID ,
	token: '' || token,
	DepartmentID:'' || DepartmentID,
	DesignationID:'' || DesignationID,
	EmployeeID:''|| EmployeeID,
	ClientID:'' || ClientID,
	loading: false,
	errorMessage: null,
};

export const AuthReducer = (initialState, action) => {
	// console.log(action.payload)
	switch (action.type) {
		case 'REQUEST_LOGIN':
			return {
				...initialState,
				loading: true,
			};
		case 'LOGIN_SUCCESS':
			return {
				...initialState,
				username: action.payload.UserFullName,
				RoleID: action.payload.RoleID,
				UserID: action.payload.UserID,
				token: action.payload.access_token,
				DepartmentID:action.payload.DepartmentID,
				DesignationID:action.payload.DesignationID,
				EmployeeID:action.payload.EmployeeID,
				ClientID:action.payload.ClientID,
				loading: false,
			};
		case 'LOGOUT':
			return {
				...initialState,
				username: '',
				RoleID:'',
				UserID:'',
				DepartmentID:'',
				DesignationID:'',
				EmployeeID:'',
				ClientID:'',
				token: '',
			};

		case 'LOGIN_ERROR':
			return {
				...initialState,
				loading: false,
				errorMessage: action.error,
			};

		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
};
