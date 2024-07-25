import { Sticker, Stickers } from '@/types/sticker';
import { User } from '@/types/user';
import { useContext, useState } from 'react';

interface Props extends React.PropsWithChildren {}

export const MessageFormProvider = ({ children }: Props) => {
  const [userInfo, setUserInfo] = useState<User>({
    id: -1,
    name: '',
    imgUrl: '',
  });
  const [alias, setAlias] = useState('집에 가고 싶은 누군가에게 ㅠㅠ');
  const [message, setMessage] = useState('');
  const [keywords, setKeywords] = useState<string[] | undefined>();
  const [card, setCard] = useState('');
  const [stickers, setStickers] = useState<Stickers>([]);

  const handleChangeInfo = (newInfo: Partial<User>) => {
    setUserInfo({ ...userInfo, ...newInfo });
  };

  const handleChangeAlias = (newAlias: string) => {
    setAlias(newAlias);
  };

  const handleChangeMessage = (value: string) => {
    setMessage(value);
  };

  const handleChangeKeywords = (newKeywords: string[]) => {
    setKeywords(() => [...newKeywords]);
  };

  const handleChangeCard = (newCard: string) => {
    setCard(newCard);
  };

  const handleChangeSticker = (id: number, newSticker: Sticker) => {};

  return <>{children}</>;
};
