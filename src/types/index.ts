export type Category = 'اطلاعیه' | 'خبر' | 'رویداد' | 'فوری';
export type Priority = 'normal' | 'important' | 'urgent';

export interface Announcement {
  id: string;
  title: string;
  summary: string;
  content?: string;
  image?: string;
  category: Category;
  priority: Priority;
  date: string;
  year: number;
  department?: string;
  tags?: string[];
}
