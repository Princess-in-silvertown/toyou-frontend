import { User } from '@/types/user';
import { useMemo, useState } from 'react';
import {
  DEFAULT_USERINFO,
  messageFormContext,
  messageFormDispatchContext,
} from '../states/messageFormContext';
import { useStickerEdit } from '@hooks/specific/useStickerEdit';

interface Props extends React.PropsWithChildren {}

export const MessageFormProvider = ({ children }: Props) => {
  const [userInfo, setUserInfo] = useState<User>(DEFAULT_USERINFO);
  const [alias, setAlias] = useState('');
  const [message, setMessage] = useState('');
  const [coverImgUrl, setCoverImgUrl] = useState('');
  const [keywords, setKeywords] = useState<string[]>([]);

  const {
    stickers,
    handleAddSticker,
    handleDeleteSticker,
    handleChangeSticker,
    getStickerList,
  } = useStickerEdit();

  const handleChangeInfo = (newInfo: Partial<User>) => {
    setUserInfo({ ...userInfo, ...newInfo });
  };

  const handleChangeAlias = (newAlias: string) => {
    setAlias(newAlias);
  };

  const handleChangeMessage = (value: string) => {
    setMessage(value);
  };

  const handleChangeCoverImgUrl = (newUrl: string) => {
    setCoverImgUrl(newUrl);
  };

  const handleLoadKeywords = (newKeywords: string[]) => {
    setKeywords(() => [...keywords, ...newKeywords]);
  };

  const handleAddKeyword = (newKeyword: string) => {
    setKeywords((prev) => [...prev, newKeyword]);
  };

  const handleDeleteKeyword = (keyword: string) => {
    setKeywords((prev) => prev.filter((item) => keyword !== item));
  };

  const dispatch = useMemo(
    () => ({
      handleChangeInfo,
      handleChangeMessage,
      handleChangeAlias,
      handleChangeCoverImgUrl,

      // keyword
      handleLoadKeywords,
      handleAddKeyword,
      handleDeleteKeyword,

      // sticker
      handleAddSticker,
      handleDeleteSticker,
      handleChangeSticker,
      getStickerList,
    }),
    [userInfo, alias, message, coverImgUrl, keywords, stickers]
  );

  const store = useMemo(
    () => ({
      userInfo,
      alias,
      message,
      coverImgUrl,
      keywords,
      stickers,
    }),
    [userInfo, alias, message, coverImgUrl, keywords, stickers]
  );

  return (
    <messageFormContext.Provider value={store}>
      <messageFormDispatchContext.Provider value={dispatch!}>
        {children}
      </messageFormDispatchContext.Provider>
    </messageFormContext.Provider>
  );
};
