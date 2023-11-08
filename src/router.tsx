import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';

import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

// Pages

const Overview = Loader(lazy(() => import('src/content/overview')));

// Dashboards

const DashBoardHome = Loader(
  lazy(() => import('src/content/dashboards/Crypto'))
);

// Applications

const Messenger = Loader(
  lazy(() => import('src/content/applications/Messenger'))
);
const Exam = Loader(lazy(() => import('src/content/applications/Exam')));
const ManagementUsers = Loader(
  lazy(() => import('src/content/applications/ManagementUsers'))
);

const Course = Loader(lazy(() => import('src/content/applications/Course')));

const Chapter = Loader(lazy(() => import('src/content/applications/Chapter')));

const Lessons = Loader(lazy(() => import('src/content/applications/Lessons')));

const Class = Loader(lazy(() => import('src/content/applications/Class')));

const CategoryExam = Loader(
  lazy(() => import('src/content/applications/CategoryExam'))
);

const AddStudent = Loader(
  lazy(() => import('src/content/applications/AddStudent'))
);

const AddTeacher = Loader(
  lazy(() => import('src/content/applications/AddTeacher'))
);

const AddWeekday = Loader(
  lazy(() => import('src/content/applications/AddClassWeekday'))
);

const UserProfile = Loader(
  lazy(() => import('src/content/applications/Users/profile'))
);
const UserSettings = Loader(
  lazy(() => import('src/content/applications/Users/settings'))
);

//Statistical
const StatisticalAmount = Loader(
  lazy(() => import('src/content/statistical/StatisticalAmount'))
);

const StatisticalDoExam = Loader(
  lazy(() => import('src/content/statistical/StatisticalNumberDoExam'))
);

// Components

// Status

const Status404 = Loader(
  lazy(() => import('src/content/pages/Status/Status404'))
);

//login
const Login = Loader(lazy(() => import('src/content/pages/Login/Login')));

const routes: RouteObject[] = [
  {
    path: '',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <DashBoardHome />
      },
      {
        path: 'messenger',
        element: <Messenger />
      }
    ]
  },
  {
    path: '',
    element: <BaseLayout />,
    children: [
      {
        path: '*',
        element: <Status404 />
      }
    ]
  },
  {
    path: 'statistical',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="amount" replace />
      },
      {
        path: 'amount',
        element: <StatisticalAmount />
      },
      {
        path: 'do-exam',
        element: <StatisticalDoExam />
      }
    ]
  },
  {
    path: 'management',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="transactions" replace />
      },
      {
        path: 'user',
        element: <ManagementUsers />
      },
      {
        path: 'exam',
        element: <Exam />
      },
      {
        path: 'course',
        element: <Course />
      },
      {
        path: 'chapter',
        element: <Chapter />
      },
      {
        path: 'lessons',
        element: <Lessons />
      },
      {
        path: 'category-exam',
        element: <CategoryExam />
      },
      {
        path: 'class',
        children: [
          {
            path: '',
            element: <Class />
          },
          {
            path: 'add-student',
            element: <AddStudent />
          },
          {
            path: 'add-teacher',
            element: <AddTeacher />
          },
          {
            path: 'add-weekday',
            element: <AddWeekday />
          }
        ]
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            element: <Navigate to="details" replace />
          },
          {
            path: 'details',
            element: <UserProfile />
          },
          {
            path: 'settings',
            element: <UserSettings />
          }
        ]
      }
    ]
  },

  {
    path: '/login',
    element: <Login />
  }
];

export default routes;
