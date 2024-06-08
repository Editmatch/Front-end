import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useEnvironment } from "../data/contexts/enviromentContext";

interface Project {
  orderId: string;
  title: string;
  description: string;
  skills: string;
}

const useProjects = (userId: string) => {
  const { apiUrl } = useEnvironment();
  const [loading, setLoading] = useState(true);
  const [inProgressOrders, setInProgressOrders] = useState<Project[]>([]);
  const [completedOrders, setCompletedOrders] = useState<Project[]>([]);
  const [cancelledOrders, setCancelledOrders] = useState<Project[]>([]);
  const [availableOrders, setAvailableOrders] = useState<Project[]>([]);

  const fetchProjects = useCallback(() => {
    setLoading(true);
    axios
      .get(`${apiUrl}/orders/order-client?id=${userId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      })
      .then((response) => {
        const {
          inProgressOrders,
          completedOrders,
          cancelledOrders,
          availableOrders,
        } = response.data;
        setInProgressOrders(inProgressOrders || []);
        setCompletedOrders(completedOrders || []);
        setCancelledOrders(cancelledOrders || []);
        setAvailableOrders(availableOrders || []);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [apiUrl, userId]);

  useEffect(() => {
    fetchProjects();

    const intervalId = setInterval(() => {
      fetchProjects();
    }, 10000);

    return () => clearInterval(intervalId);
  }, [fetchProjects]);

  return { loading, inProgressOrders, completedOrders, cancelledOrders, availableOrders };
};

export default useProjects;
