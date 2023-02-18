import {
  initialThreads,
  getAll,
  get,
  getByDataPoint,
  createThread,
  addComment,
} from './commentThreadsRepository';
import { v4 as uuidv4 } from 'uuid';

jest.mock('uuid');

describe('commentThreadsRepository', () => {
  it('initialThreads should contain data', () => {
    expect(initialThreads.length).not.toBeNull;
  });

  it('getAll should contain all comment threads with their properties defined', () => {
    const allThreads = getAll();
    expect(allThreads.length).toEqual(initialThreads.length);

    allThreads.forEach((thread) => {
      expect(thread.id).toBeDefined();
      expect(thread.commentsCount).toBeDefined();
      expect(thread.chartDataPoint).toBeDefined();
    });
  });

  it('get should return a thread by id', () => {
    const thread = get(initialThreads[0]!.id);
    expect(thread).toBeDefined();
    expect(thread?.id).toEqual(initialThreads[0]!.id);
  });

  it('get should return null for a wrong id', () => {
    const thread = get('wrong-id');
    expect(thread).toBeNull();
  });

  it('getByDataPoint should return the correct thread by chart data point', () => {
    const dataPoint = initialThreads[0]!.chartDataPoint;
    const thread = getByDataPoint(dataPoint);
    expect(thread).toBeDefined();
    expect(thread!.chartDataPoint).toEqual(dataPoint);
  });

  it('createThread should create a new thread', () => {
    // Here we can introduce constants file for all the features and countries to avoid type of any
    (uuidv4 as jest.Mock).mockImplementation(() => 'id-1');
    const dataPoint = { feature: 'pizza' as any, country: 'FR' as any };
    const firstComment = { userName: 'Vince', text: 'textSample' };
    const thread = createThread(dataPoint, firstComment);
    expect(thread).toBeDefined();
    expect(thread.commentsCount).toEqual(1);
    expect(thread.comments).toEqual([firstComment]);
    expect(get(thread.id)).toEqual(thread);
  });

  it('createThread should throw an error if a thread already exists for the same dataPoint', () => {
    (uuidv4 as jest.Mock).mockImplementation(() => 'id-2');
    const existingThread = initialThreads[0];
    const firstComment = { userName: 'Vince', text: 'textSample' };
    expect(() =>
      createThread(existingThread!.chartDataPoint, firstComment),
    ).toThrow('Thread with this dataPoint already exists');
  });

  it('createThread should throw an error if a thread with the same id already exists', () => {
    const dataPoint = { feature: 'sushi' as any, country: 'FR' as any };
    (uuidv4 as jest.Mock).mockImplementation(() => initialThreads[0]!.id);
    const firstComment = { userName: 'Vince', text: 'textSample' };
    expect(() => createThread(dataPoint, firstComment)).toThrow(
      'Thread with this id already exists',
    );
  });

  it('addComment should add a comment to a thread', () => {
    const thread = initialThreads[0];
    const initialCommentsCount = thread!.commentsCount;
    const commentNew = { userName: 'Vince', text: 'textSample' };
    const updatedThread = addComment(thread!.id, commentNew);
    expect(updatedThread).toBeDefined();
    expect(updatedThread.commentsCount).toEqual(initialCommentsCount + 1);
    expect(updatedThread.comments).toContain(commentNew);
    expect(get(updatedThread.id)).toEqual(updatedThread);
  });

  it('addComment should throw an error if the thread does not exist', () => {
    const nonExistentThreadId = 'wrong-id';
    const commentNew = { userName: 'Vince', text: 'textSample' };
    expect(() => addComment(nonExistentThreadId, commentNew)).toThrow(
      'Thread not found',
    );
  });
});
