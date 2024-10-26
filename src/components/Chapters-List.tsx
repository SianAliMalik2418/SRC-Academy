"use client";

import { Chapter } from "@/types/types";
import { useEffect, useState } from "react";

import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { cn } from "@/lib/utils";
import { Grip, Pencil } from "lucide-react";
import { Badge } from "./ui/badge";

type ChaptersListProps = {
  items: Chapter[];
  onEdit: (chapterId: string) => void;
  onReorder: (updatedData: { id: string; position: number }[]) => void;
};

const ChaptersList = ({ items, onEdit, onReorder }: ChaptersListProps) => {
  const [isMounting, setIsMounting] = useState(false);
  const [chapters, setChapters] = useState(items);

  useEffect(() => {
    setIsMounting(true);
  }, []);

  useEffect(() => {
    setChapters(items);
  }, [items]);

  if (!isMounting) {
    return null;
  }

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(chapters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const startIndex = Math.min(result.source.index, result.destination.index);

    const endIndex = Math.max(result.source.index, result.destination.index);

    const updatedChapters = items.slice(startIndex, endIndex + 1);

    setChapters(items);

    const bulkUpdateData = updatedChapters.map((chapter) => ({
      id: chapter._id,
      position: items.findIndex((item) => item._id === chapter._id),
    }));

    onReorder(bulkUpdateData);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="chapters">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {chapters.map((chapter, index) => (
              <Draggable
                key={chapter._id}
                draggableId={chapter._id}
                index={index}
              >
                {(provided) => (
                  <div
                    className={cn(
                      "mb-4 flex items-center gap-x-2 rounded-md border border-slate-200 bg-slate-200 text-sm text-slate-700",
                      chapter.isPublished &&
                        "border-sky-20 bg-sky-100 text-sky-700",
                    )}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <div
                      className={cn(
                        "rounded-l-md border-r border-r-slate-200 px-2 py-3 transition hover:bg-slate-300",
                        chapter.isPublished &&
                          "border-r-sky-200 hover:bg-sky-200",
                      )}
                      {...provided.dragHandleProps}
                    >
                      <Grip className="h-5 w-5" />
                    </div>
                    <h1 className="font-semibold">{chapter.chapterTitle}</h1>

                    <div className="ml-auto flex items-center gap-x-2 p-4">
                      {chapter.isFree && (
                        <Badge className="border border-slate-600">Free</Badge>
                      )}
                      <Badge
                        className={cn(
                          "border border-slate-800 bg-slate-500 text-white",
                          chapter.isPublished && "cursor-default bg-sky-700",
                        )}
                      >
                        {chapter.isPublished ? "Published" : "Draft"}
                      </Badge>

                      <Pencil
                        className="h-4 w-4 cursor-pointer transition hover:opacity-75"
                        onClick={() => onEdit(chapter._id)}
                      />
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ChaptersList;
