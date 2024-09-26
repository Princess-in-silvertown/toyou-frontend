import { RollingPaperForm } from '@/types/paper';
import { requestPostPaper } from '@apis/requests';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

export const useWritePaper = (userId: number) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const mutation = useMutation({
    mutationFn: (data: RollingPaperForm) => requestPostPaper(userId, data),
    onSuccess: () => {
      setIsSubmitted(true);
    },
  });

  return { ...mutation, isSubmitted };
};
