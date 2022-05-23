import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCollectionById, fetchUniqueTags } from "./collectionItemsAPI";

const initialState = {
  isFetching: false,
  items: [],
  customFields: [],
  topic: "",
  name: "",
  uniqueTags: [],
  imageUrl: "",
};

export const fetchCollection = createAsyncThunk(
  "collectionItems/fetchCollection",
  async (collectionId) => {
    const collection = await fetchCollectionById(collectionId);
    const tags = await fetchUniqueTags();
    const data = collection.data;
    data.uniqueTags = tags.data;
    console.log(data);
    return data;
  }
);

export const collectionItemsSlice = createSlice({
  name: "collectionItems",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    removeItemsByIds: (state, action) => {
      state.items = state.items.filter(
        (item) => !action.payload.includes(item["_id"])
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCollection.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchCollection.fulfilled, (state, action) => {
        const { items, name, topic, customFields, uniqueTags, imageUrl } =
          action.payload;
        state.items = items;
        state.name = name;
        state.topic = topic;
        state.isFetching = false;
        state.customFields = customFields;
        state.uniqueTags = uniqueTags;
        state.imageUrl = imageUrl;
      });
  },
});

export const { addItem, removeItemsByIds } = collectionItemsSlice.actions;

export const selectCollectionItems = (state) => state.collectionItems;

export default collectionItemsSlice.reducer;
