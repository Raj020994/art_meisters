import { useState } from "react";
import { toast } from "sonner";

const useFetch = (cb) => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const fn = async (...args) => {
    setLoading(true);
    setErrors(null);
    try {
      const response = await cb(...args);
      console.log("res", response);
      setData(response);
      return response;
    } catch (error) {
      setErrors(error);
      toast.error(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { loading, data, errors, setData, setLoading, setErrors, fn };
};

export default useFetch;

