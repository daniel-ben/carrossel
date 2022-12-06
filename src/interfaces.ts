export type mouseEvent = React.MouseEvent<HTMLImageElement>;
export type touchEvent = React.TouchEvent<HTMLImageElement>;

export type TLivro = {
  name: string;
  author: string;
  categories: string[];
  description: string;
  imageUrl?: string;
  id: string;
};

export type TCarrosselParams = {
  title: string;
  livros: { [id: string]: TLivro };
  setCurrentLivroId: React.Dispatch<React.SetStateAction<string>>;
  isAdmin: boolean;
};

export type THeaderParams = {
  setLoginDisplay: React.Dispatch<React.SetStateAction<boolean>>;
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
  isAdmin: boolean;
  setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentLivroId: React.Dispatch<React.SetStateAction<string>>;
};

export type TLoginParams = {
  setLoginDisplay: React.Dispatch<React.SetStateAction<boolean>>;
};

export type TAdminParams = {
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
  currentLivroId: string;
  setCurrentLivroId: React.Dispatch<React.SetStateAction<string>>;
  isAdmin: boolean;
};

export type THomeParams = {
  setCurrentLivroId: React.Dispatch<React.SetStateAction<string>>;
  isAdmin: boolean;
};
