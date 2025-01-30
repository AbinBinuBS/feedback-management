export const getStatusColor = (status) => {
    if (!status) return 'yellow';
    
    switch (status.toLowerCase()) {
      case 'in-progress': return 'yellow';
      case 'new': return 'blue';
      case 'in review': return 'purple';
      case 'bug': return 'red';
      default: return 'yellow';
    }
  };


  export const getTagColor = (tag) => {
    if (!tag) return 'gray';
    
    switch (tag.toLowerCase()) {
      case 'feedback': return 'purple';
      case 'bug': return 'red';
      case 'idea': return 'yellow';
      case 'feature': return 'blue';
      default: return 'gray';
    }
  };

  export const getModuleColor = (type) => {
    if (!type) return 'gray';
    
    switch (type.toLowerCase()) {
      case 'channel': return 'emerald';
      case 'project': return 'blue';
      case 'task': return 'indigo';
      case 'chat': return 'violet';
      case 'alert': return 'rose';
      default: return 'gray';
    }
  };


  export const getModuleIconColor = (type) => {
    switch (type.toLowerCase()) {
      case 'channel': return 'rgb(16, 185, 129)';
      case 'project': return 'rgb(59, 130, 246)';
      case 'task': return 'rgb(99, 102, 241)';
      case 'chat': return 'rgb(139, 92, 246)';
      case 'alert': return 'rgb(244, 63, 94)';
      default: return 'currentColor';
    }
  };


  export const getTagIconColor = (tag) => {
    switch (tag.toLowerCase()) {
      case 'feedback': return 'rgb(168, 85, 247)';
      case 'bug': return 'rgb(239, 68, 68)';
      case 'idea': return 'rgb(234, 179, 8)';
      case 'feature': return 'rgb(59, 130, 246)';
      default: return 'currentColor';
    }
  };

  export const getTagStyles = (tag) => {
    const baseClasses = "px-3 py-1 rounded-lg flex items-center gap-2 text-sm";
    const colorClasses = {
      feedback: "border-purple-500 text-purple-500",
      bug: "border-red-500 text-red-500",
      idea: "border-yellow-500 text-yellow-500",
      feature: "border-blue-500 text-blue-500"
    };

    return `border ${colorClasses[tag.toLowerCase()] || "border-gray-500 text-gray-500"} ${baseClasses}`;
  };

  export const getModuleStyles = (type) => {
    const baseClasses = "px-3 py-1 rounded-lg flex items-center gap-2 text-sm font-medium";
    const colorClasses = {
      channel: "bg-emerald-500/10 text-emerald-500",
      project: "bg-blue-500/10 text-blue-500",
      task: "bg-indigo-500/10 text-indigo-500",
      chat: "bg-violet-500/10 text-violet-500",
      alert: "bg-rose-500/10 text-rose-500"
    };

    return `${colorClasses[type.toLowerCase()] || "bg-gray-500/10 text-gray-500"} ${baseClasses}`;
  };