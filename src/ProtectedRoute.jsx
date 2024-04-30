import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function ProtectedRoute(props){
  const{ Component } = props;
  const navigate = useNavigate();
  useEffect(() =>{
    let isLoggedIn = localStorage.getItem('session');
    if(!isLoggedIn){
      navigate('login');
    }
  });

  return (
    <div>
      <Component />
    </div>
  )
}

export default ProtectedRoute;
