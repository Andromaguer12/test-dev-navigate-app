import React, { ReactNode, useEffect } from 'react'
import styles from './Common.module.scss'
import { useRouter } from 'next/router';
import { pagesConfig } from '../../constants/pages';
import { useAppSelector } from '../../services/redux/store';
import { selectUserInfo } from '../../services/redux/reducers/user/selector';

export default function CommonLayout({children}: { children: ReactNode }) {
  const user = useAppSelector(selectUserInfo);
  const router = useRouter();
  const currentRouteConfig = pagesConfig[router.pathname]

  const checkIfPrivateRoute = (currentRouteConfig) => {
    if(currentRouteConfig.isPrivate && window.sessionStorage.getItem('accessToken') && user.email){
      return 'done'
    }
    else {
      window.sessionStorage.removeItem('accessToken')
      return 'redirect'
    }
  }

  useEffect(() => {
    if (checkIfPrivateRoute(currentRouteConfig) === 'redirect') {
      router.push(currentRouteConfig.redirect)
    }
  }, [currentRouteConfig])
  

  return (
    <div className={styles.maxParent}>
      <div className={styles.dashboardLimit}>
        {children}
      </div>
    </div>
  )
}
