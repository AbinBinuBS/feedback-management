import { getModuleIconColor, getTagIconColor } from "./feedbackBoxHelper";

export const FeedbackIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-yellow-500">
    <path d="M8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1ZM7 11V9H9V11H7ZM7 8V5H9V8H7Z" fill="currentColor"/>
  </svg>
);

export const BugIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-red-500">
    <path d="M4 8H2C2 4.13401 5.13401 1 9 1M12 8H14C14 4.13401 10.866 1 7 1M8 14C10.2091 14 12 12.2091 12 10V6C12 3.79086 10.2091 2 8 2C5.79086 2 4 3.79086 4 6V10C4 12.2091 5.79086 14 8 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const IdeaIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-green-500">
    <path d="M8 1C5.23858 1 3 3.23858 3 6C3 7.64334 3.78563 9.09318 5 10V12C5 12.5523 5.44772 13 6 13H10C10.5523 13 11 12.5523 11 12V10C12.2144 9.09318 13 7.64334 13 6C13 3.23858 10.7614 1 8 1ZM6 14V15H10V14H6Z" fill="currentColor"/>
  </svg>
);

export const FeatureIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-500">
    <path d="M8 4L9.5 7H14L10.5 9L12 12L8 10L4 12L5.5 9L2 7H6.5L8 4Z" fill="currentColor"/>
  </svg>
);

export const UploadIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400 mx-auto mb-2">
    <path d="M7 10V9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9V10C19.2091 10 21 11.7909 21 14C21 16.2091 19.2091 18 17 18H7C4.79086 18 3 16.2091 3 14C3 11.7909 4.79086 10 7 10ZM12 12L12 16M12 12L9 15M12 12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);


export const getModuleIcon = (type) => {
  if (!type) return null;
  
  const iconColor = getModuleIconColor(type);
  
  switch (type.toLowerCase()) {
    case 'channel':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 11a9 9 0 0 1 9 9" />
          <path d="M4 4a16 16 0 0 1 16 16" />
          <circle cx="5" cy="19" r="1" />
        </svg>
      );
    case 'project':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 3h18v18H3zM12 8v8M8 12h8" />
        </svg>
      );
    case 'task':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 11l3 3L22 4" />
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
        </svg>
      );
    case 'chat':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      );
    case 'alert':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01" />
        </svg>
      );
    default:
      return null;
  }
};


export const getTagIcon = (tag) => {
  if (!tag) return null;

  const iconColor = getTagIconColor(tag);

  switch (tag.toLowerCase()) {
    case 'feedback':
      return (
        <svg className="w-4 h-4" fill="none" stroke={iconColor} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      );
    case 'bug':
      return (
        <svg className="w-4 h-4" fill="none" stroke={iconColor} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9.75v-2.25m0 4.5h0m-3-9h6m-6 15h6M12 4.5c-5.385 0-9.75 4.365-9.75 9.75 0 5.385 4.365 9.75 9.75 9.75s9.75-4.365 9.75-9.75c0-5.385-4.365-9.75-9.75-9.75z M9 12.75L12 15.75 15 12.75" />
        </svg>
      );
    case 'idea':
      return (
        <svg className="w-4 h-4" fill="none" stroke={iconColor} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      );
    case 'feature':
      return (
        <svg className="w-4 h-4" fill="none" stroke={iconColor} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
    default:
      return null;
  }
};