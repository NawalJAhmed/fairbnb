import { csrfFetch } from './csrf';

const LOAD_STORY = 'stories/LOAD';
const ADD_STORY = 'stories/ADD_STORY';
const UPDATE_STORY = 'stories/UPDATE_STORY';
const DELETE_STORY = 'stories/DELETE_STORY';

const loadStory = (stories) => ({
  type: LOAD_STORY,
  stories,
});

const addOneStory = (newStory) => ({
  type: ADD_STORY,
  newStory,
});

const updateOneStory = (updatedStory) => ({
  type: UPDATE_STORY,
  updatedStory,
});

const deleteOneStory = (deletedStoryId) => ({
  type: DELETE_STORY,
  deletedStoryId,
});

export const getStories = () => async (dispatch) => {
  const response = await csrfFetch(`/api/stories`);

  if (response.ok) {
    const stories = await response.json();
    dispatch(loadStory(stories));
  }
};

export const createStory = (newStory) => async (dispatch) => {
  const { authorId, title, propertyType, city, price, image, body } = newStory;
  const formData = new FormData();
  formData.append('authorId', authorId);
  formData.append('title', title);
  formData.append('propertyType', propertyType);
  formData.append('city', city);
  formData.append('price', price);
  formData.append('body', body);

  if (image) formData.append('image', image);

  const response = await csrfFetch(`/api/stories`, {
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    body: formData,
  });

  if (response.ok) {
    const newStory = await response.json();
    dispatch(addOneStory(newStory));
    return newStory;
  }
};

export const updateStory = (updateStory) => async (dispatch) => {
  const { id, authorId, title, propertyType, city, price, oldImage, newImage, body } = updateStory;
  const formData = new FormData();
  formData.append('id', id);
  formData.append('authorId', authorId);
  formData.append('title', title);
  formData.append('propertyType', propertyType)
  formData.append('city', city);
  formData.append('price', price);
  formData.append('body', body);

  if (oldImage) formData.append('imageUrl', oldImage);
  if (newImage) formData.append('imageUrl', newImage);

  const response = await csrfFetch(`/api/stories/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'multipart/form-data' },
    body: formData,
  });

  if (response.ok) {
    const updatedStory = await response.json();
    dispatch(updateOneStory(updatedStory));
    return updatedStory;
  }
};

export const deleteStory = (storyId) => async (dispatch) => {
  const response = await csrfFetch(`/api/stories/delete/${storyId}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    const deletedStoryId = await response.json();
    dispatch(deleteOneStory(deletedStoryId));
  }
};

const initialState = {};

const storiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_STORY: {
      const newState = {};
      action.stories.forEach((story) => {
        newState[story.id] = story;
      });
      return newState;
    }
    case ADD_STORY: {
      const newState = { ...state };
      newState[action.newStory.id] = { ...action.newStory };
      return newState;
    }
    case UPDATE_STORY: {
      const newState = { ...state };
      newState[action.updatedStory.id] = { ...action.updatedStory };
      return newState;
    }
    case DELETE_STORY: {
      const newState = { ...state };
      delete newState[action.deletedStoryId];
      return newState;
    }
    default:
      return state;
  }
};

export default storiesReducer;
