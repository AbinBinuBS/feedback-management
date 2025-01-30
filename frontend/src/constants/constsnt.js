export const FILE_SIZE_LIMIT = 5 * 1024 * 1024;
export const platforms = ['Android', 'iOS', 'Web'];
export const modules = ['Channel', 'Project', 'Tasks', 'Chat', 'Alert'];
export const availableTags = [
    { 
      id: 'feedback', 
      label: 'Feedback',
      icon: FeedbackIcon,
      className: 'border-yellow-500/50 text-yellow-500 bg-yellow-500/10'
    },
    { 
      id: 'bug', 
      label: 'Bug Report',
      icon: BugIcon,
      className: 'border-red-500/50 text-red-500 bg-red-500/10'
    },
    { 
      id: 'idea', 
      label: 'Idea',
      icon: IdeaIcon,
      className: 'border-green-500/50 text-green-500 bg-green-500/10'
    },
    { 
      id: 'feature', 
      label: 'Feature Request',
      icon: FeatureIcon,
      className: 'border-blue-500/50 text-blue-500 bg-blue-500/10'
    }
  ];

export  const initialValues = {
    title: '',
    platform: '',
    module: '',
    description: '',
    tags: [],
    attachments: []
  };