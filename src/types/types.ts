export type Chapter = {
  _id: string;
  chapterTitle: string;
  description?: string;
  position?: number;
  videoUrl?: string;
  isFree?: boolean;
  isPublished?: boolean;
  muxData?: {
    assetId?: string;
    playbackId?: string;
  };
  userProgress?: {
    userId: string;
    isCompleted?: boolean;
  };
};

export type CourseModelType = {
  _id: string;

  title: string;
  description?: string;

  userId: string;

  category: string;

  imageUrl?: string;

  price?: number;

  isPublished: boolean;

  createdAt: Date;
  updatedAt: Date;

  attachments: {
    attachmentName: string;
    attachmentUrl: string;
  }[];

  muxData?: {
    assetId?: string;
    playbackId?: string;
  };

  userProgress?: {
    userId: string;
    isCompleted?: boolean;
  }[];

  chapters?: Chapter[];
};
