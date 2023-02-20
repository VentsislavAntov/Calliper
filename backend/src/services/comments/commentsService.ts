import * as commentThreadsRepository from 'repositories/commentThreadsRepository';
import { ChartDataPoint } from 'models/ChartDataPoint';
import { Comment } from 'models/Comment';
import { BadRequestError } from 'utils/errors';
import { CommentThreadWithComments } from '../../models/CommentThread';

export const getAllCommentThreads = () => {
  return commentThreadsRepository.getAll();
};

export const getCommentThread = (id: string) => {
  const thread = commentThreadsRepository.get(id);

  if (!thread) {
    throw new BadRequestError(`Thread with id ${id} not found`);
  }

  return thread;
};

export const createThread = (dataPoint: ChartDataPoint, comment: Comment) => {
  try {
    const thread = commentThreadsRepository.getByDataPoint(dataPoint);

    if (!thread) {
      return commentThreadsRepository.createThread(dataPoint, comment);
    }

    return commentThreadsRepository.addComment(
      (thread as CommentThreadWithComments)?.id ?? '',
      comment,
    );
  } catch (error) {
    console.error(error);
    throw new BadRequestError('Failed to create thread');
  }
};

export const respondToThread = (id: string, comment: Comment) => {
  try {
    return commentThreadsRepository.addComment(id, comment);
  } catch (error) {
    console.error(error);
    throw new BadRequestError('Failed to respond to comment thread');
  }
};
