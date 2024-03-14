import { User } from '../app/modules/user/user.model';

export const findLastUserId = async (): Promise<string | undefined> => {
  const lastUser = await User.findOne({}, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  return lastUser?.id ? lastUser.id.substring(2) : undefined;
};
export const generateUserId = async (): Promise<string> => {
  const currentId = await findLastUserId();
  const parsedId = currentId ? parseInt(currentId) : 0;
  const incrementedId = (parsedId + 1).toString().padStart(5, '0');
  const userId = `U-${incrementedId}`;
  return userId;
};
