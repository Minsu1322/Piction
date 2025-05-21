import { supabase } from "./supabaseClient";

export const uploadImageToSupabase = async (file: File, userId: string) => {
  const fileExt = file.name.split(".").pop();
  const fileName = `${userId}_${Date.now()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error } = await supabase.storage
    .from("story-covers") // 생성한 버킷 이름
    .upload(filePath, file);

  if (error) throw error;

  const { data } = supabase.storage.from("story-covers").getPublicUrl(filePath);

  return data.publicUrl;
};
