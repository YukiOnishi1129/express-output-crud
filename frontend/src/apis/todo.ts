import { AxiosResponse } from "axios";
import { globalAxios, isAxiosError } from "./config";
import { ResponseTodoListType, ResponseTodoType } from "../interfaces/Todo";

/**
 * Todoリスト取得のAPI接続処理
 * @returns
 */
export const fetchTodoListApi = async () => {
  try {
    const { data }: AxiosResponse<ResponseTodoListType> = await globalAxios.get(
      "/todos"
    );
    return data;
  } catch (err) {
    if (isAxiosError(err)) {
      return err.code;
    }
  }
};

/**
 * idに紐づく単一のTodo取得のAPI接続処理
 * @param id
 * @returns
 */
export const fetchTodoDetailApi = async (id: number) => {
  try {
    const { data }: AxiosResponse<ResponseTodoType> = await globalAxios.get(
      `/todos/${id}`
    );
    return data;
  } catch (err) {
    if (isAxiosError(err)) {
      return err.code;
    }
  }
};

/**
 * Todo新規登録のAPI接続処理
 * @param title
 * @param content
 * @returns
 */
export const createTodoApi = async (title: string, content: string) => {
  try {
    const { data }: AxiosResponse<ResponseTodoType> = await globalAxios.post(
      "/todos",
      {
        title,
        content,
      }
    );
    return data;
  } catch (err) {
    if (isAxiosError(err)) {
      return err.code;
    }
  }
};

/**
 * Todo更新のAPI接続処理
 * @param id
 * @param title
 * @param content
 * @returns
 */
export const updateTodoApi = async (
  id: number,
  title: string,
  content: string
) => {
  try {
    const { data }: AxiosResponse<ResponseTodoType> = await globalAxios.patch(
      `/todos/${id}`,
      {
        title,
        content,
      }
    );
    return data;
  } catch (err) {
    if (isAxiosError(err)) {
      return err.code;
    }
  }
};

/**
 * Todo削除のAPI接続処理
 * @param id
 * @returns
 */
export const deleteTodoApi = async (id: number) => {
  try {
    const { data }: AxiosResponse<ResponseTodoType> = await globalAxios.delete(
      `/todos/${id}`
    );
    return data;
  } catch (err) {
    if (isAxiosError(err)) {
      return err.code;
    }
  }
};
