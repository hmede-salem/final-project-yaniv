export default interface Category {
  _id: string;
  id: string;
  category: string;
  image: string;
  valid: boolean;
}

export const allCategories = {
  _id: "all",
  id: "6b874fd9-1ca1-43c6-8a02-89cc9dd1af71",
  category: "All Categories",
  image: "https://img.icons8.com/?size=1x&id=0OyRUGKETRhj&format=png",
  valid: true,
};
