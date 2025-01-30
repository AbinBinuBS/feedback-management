import { useEffect, useState } from "react";
import FeedbackModal from "../components/addFeedbackModal";
import FeedbackCard from "../components/feedbackBox";
import axios from "axios";
import { toast } from "react-toastify";

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feedbackItems, setFeedbackItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getAllFeedbacks = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const { data } = await axios.get('https://feedback-management-kynm.onrender.com/feedbacks');
      console.log(data.feedbacks);
      setFeedbackItems(data.feedbacks);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
      setError('Failed to load feedbacks. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllFeedbacks();
  }, []);

  const handleFeedbackEdit = (updatedFeedback) => {
    setFeedbackItems(prevFeedbacks =>
      prevFeedbacks.map(feedback =>
        feedback._id === updatedFeedback._id ? updatedFeedback : feedback
      )
    );
  };

  const handleFeedbackDelete = async (feedbackId) => {
    try {      
      const {data} = await axios.delete(`https://feedback-management-kynm.onrender.com/feedbacks/${feedbackId}`);
      if(data.message == 'Success'){
        toast.success("Feedback removed Successfully.")
        setFeedbackItems(prevFeedbacks => 
          prevFeedbacks.filter(feedback => feedback._id !== feedbackId)
        );
      }
    } catch (error) {
      console.error('Error deleting feedback:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] p-8">
      <div className="relative max-w-3xl mx-auto">
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="text-white">Loading feedbacks...</div>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center p-4 bg-red-500/10 rounded-lg">
            {error}
          </div>
        ) : feedbackItems.length === 0 ? (
          <div className="text-gray-400 text-center p-8">
            No feedbacks yet. Be the first to add one!
          </div>
        ) : (
          <div className="space-y-4 mb-20">
            {feedbackItems.map((item) => (
              <FeedbackCard
                key={item._id}
                {...item}
                onEdit={handleFeedbackEdit}
                onDelete={() => handleFeedbackDelete(item._id)}
              />
            ))}
          </div>
        )}

        <div className="sticky bottom-20 w-full flex justify-end z-10">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-yellow-400 text-black px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-yellow-500 transition-colors"
          >
            <span className="text-xl">+</span>
            Feedback
          </button>
        </div>
      </div>

      <FeedbackModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        getAllData={getAllFeedbacks}
      />
    </div>
  );
};

export default HomePage;