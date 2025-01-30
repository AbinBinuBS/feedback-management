import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { FeedbackIcon, BugIcon, IdeaIcon, FeatureIcon, UploadIcon } from '../helperFunctions/icons.jsx';
import axios from 'axios'
import { toast } from 'react-toastify';
import { validationSchema } from '../validations/feedbackValidation.js';
const FILE_SIZE_LIMIT = 5 * 1024 * 1024;
const FeedbackModal = ({ isOpen, onClose, getAllData }) => {
  const [fileErrors, setFileErrors] = useState([]);
  if (!isOpen) return null;
  const platforms = ['Android', 'iOS', 'Web'];
  const modules = ['Channel', 'Project', 'Tasks', 'Chat', 'Alert'];
  const availableTags = [
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
  const initialValues = {
    title: '',
    platform: '',
    module: '',
    description: '',
    tags: [],
    attachments: []
  };
  const validateFile = (file) => {
    if (!file) return false;
    
    if (!file.type.startsWith('image/')) {
      return 'Only image files are allowed';
    }

    if (file.size > FILE_SIZE_LIMIT) {
      return 'File must be less than 5MB';
    }

    return false;
  };
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('platform', values.platform);
      formData.append('module', values.module);
      formData.append('description', values.description);
      formData.append('tags', JSON.stringify(values.tags));
      if (values.attachments && values.attachments.length > 0) {
        values.attachments.forEach((attachment) => {
        if (attachment.file) {
          formData.append('images', attachment.file);
        }
      });
      }
      await axios.post('http://localhost:3005/feedbacks', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success("Feedback added successfully..")
      getAllData()
      setSubmitting(false);
      onClose();
    } catch (error) {
      toast.error(error.message)
      console.log(error);
    }
  };
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#1E293B] rounded-lg w-full max-w-lg p-6 relative max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">Bug Report</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors w-8 h-8 flex items-center justify-center"
          >
            ✕
          </button>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, setFieldValue, isSubmitting }) => (
            <Form className="space-y-4 overflow-y-auto flex-1 pr-2">
              <div>
                <label className="flex items-center gap-2 text-white mb-2">
                  <span className="text-yellow-500">◆</span> Title<span className="text-red-500">*</span>
                </label>
                <Field
                  name="title"
                  type="text"
                  placeholder="Title"
                  className="w-full bg-[#0F172A] border border-gray-700 rounded-lg p-2 text-white"
                />
                {errors.title && touched.title && (
                  <div className="text-red-500 text-sm mt-1">{errors.title}</div>
                )}
              </div>
              <div>
                <label className="flex items-center gap-2 text-white mb-2">
                  <span className="text-blue-500">⊓</span> Platform
                </label>
                <Field
                  as="select"
                  name="platform"
                  className="w-full bg-[#0F172A] border border-gray-700 rounded-lg p-2 text-white appearance-none cursor-pointer"
                >
                  <option value="">Select the platform</option>
                  {platforms.map((platform) => (
                    <option key={platform} value={platform}>
                      {platform}
                    </option>
                  ))}
                </Field>
                {errors.platform && touched.platform && (
                  <div className="text-red-500 text-sm mt-1">{errors.platform}</div>
                )}
              </div>
              <div>
                <label className="flex items-center gap-2 text-white mb-2">
                  <span className="text-green-500">⊞</span> Module
                </label>
                <Field
                  as="select"
                  name="module"
                  className="w-full bg-[#0F172A] border border-gray-700 rounded-lg p-2 text-white appearance-none cursor-pointer"
                >
                  <option value="">Select the module</option>
                  {modules.map((module) => (
                    <option key={module} value={module}>
                      {module}
                    </option>
                  ))}
                </Field>
                {errors.module && touched.module && (
                  <div className="text-red-500 text-sm mt-1">{errors.module}</div>
                )}
              </div>
              <div>
                <label className="flex items-center gap-2 text-white mb-2">
                  <span className="text-red-500">≡</span> Description
                </label>
                <Field
                  as="textarea"
                  name="description"
                  placeholder="Add additional details here (minimum 20 characters)"
                  className="w-full bg-[#0F172A] border border-gray-700 rounded-lg p-2 text-white min-h-[100px]"
                />
                {errors.description && touched.description && (
                  <div className="text-red-500 text-sm mt-1">{errors.description}</div>
                )}
              </div>
              <div>
                <label className="flex items-center gap-2 text-white mb-2">
                  <span className="text-orange-500">📎</span> Attachments
                  <span className="text-gray-400 text-sm">(Optional)</span>
                </label>
                <label className="block">
                  <div className="w-full bg-[#0F172A] border-2 border-gray-700 border-dashed rounded-lg p-6 text-center text-gray-400 cursor-pointer hover:border-gray-500 transition-colors">
                    <UploadIcon />
                    <p>Upload image or video</p>
                    <p className="text-sm mt-1">(Drag and drop or click to upload)</p>
                  </div>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const files = Array.from(e.target.files);
                      const validFiles = [];
                      const newFileErrors = [];
                      files.forEach(file => {
                        const error = validateFile(file);
                        if (error) {
                          newFileErrors.push(`${file.name}: ${error}`);
                        } else {
                          validFiles.push({
                            id: Math.random().toString(36).substring(7),
                            file,
                            preview: URL.createObjectURL(file)
                          });
                        }
                      });
                      setFileErrors(newFileErrors);
                      setFieldValue('attachments', [...values.attachments, ...validFiles]);
                    }}
                  />
                </label>
                {fileErrors.length > 0 && (
                  <div className="mt-2">
                    {fileErrors.map((error, index) => (
                      <div key={index} className="text-red-500 text-sm">{error}</div>
                    ))}
                  </div>
                )}
                {values.attachments.length > 0 && (
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    {values.attachments.map((attachment) => (
                      <div key={attachment.id} className="relative group">
                        <img
                          src={attachment.preview}
                          alt="Preview"
                          className="w-full aspect-square object-cover rounded-lg border border-gray-700"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            URL.revokeObjectURL(attachment.preview);
                            setFieldValue(
                              'attachments',
                              values.attachments.filter(att => att.id !== attachment.id)
                            );
                          }}
                          className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gray-800 border border-gray-600 text-gray-400 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:text-white"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <label className="flex items-center gap-2 text-white mb-2">
                  <span className="text-purple-500">#</span> Tags
                </label>
                <div className="flex gap-2 flex-wrap">
                  {availableTags.map((tag) => {
                    const Icon = tag.icon;
                    const isSelected = values.tags.includes(tag.id);
                    return (
                      <button
                        key={tag.id}
                        type="button"
                        className={`
                          px-3 py-1.5 rounded-lg border text-sm
                          flex items-center gap-2 transition-colors
                          ${isSelected ? `${tag.className} ring-2 ring-offset-2 ring-offset-[#1E293B] ring-${tag.className.split('border-')[1].split('/')[0]}` : tag.className}
                          hover:border-opacity-100
                        `}
                        onClick={() => {
                          const newTags = isSelected
                            ? values.tags.filter(id => id !== tag.id)
                            : [...values.tags, tag.id];
                          setFieldValue('tags', newTags);
                        }}
                      >
                        <Icon />
                        {tag.label}
                      </button>
                    );
                  })}
                </div>
                {errors.tags && touched.tags && (
                  <div className="text-red-500 text-sm mt-1">{errors.tags}</div>
                )}
              </div>
              <div className="mt-6 pt-4 border-t border-gray-700">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-yellow-400 hover:bg-yellow-600 text-white rounded-lg py-2 px-4 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default FeedbackModal;