import * as React from "react";
import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { IoIosClose, IoIosSearch } from "react-icons/io";
import { getTasks } from "@/lib/api";
import { useTaskOperations } from "@/hooks/useTaskOperations";
import TaskFormModal from "./taskmodal";
import TaskFilterButtons from "./taskfilterbuttons";
import TaskList from "./tasklist";
import LoadingIndicator from "./loadingindicator";
import { Skeleton } from "./ui/skeleton";
import PaginationControls from "./paginationcontrols";

// Configuration for pagination
const PAGINATION_CONFIG = {
  DEFAULT_TASKS_PER_PAGE: 10,
  PAGE_SIZE_OPTIONS: [5, 10, 25, 50] as const,
  MAX_VISIBLE_PAGES: 5,
} as const;

type PageSizeOption = (typeof PAGINATION_CONFIG.PAGE_SIZE_OPTIONS)[number];

const TaskBoard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [activeFilter, setActiveFilter] = useState<
    "ALL" | "TODO" | "IN_PROGRESS" | "DONE"
  >("ALL");

  const {
    editingTask,
    editForms,
    setEditForms,
    updatingTaskId,
    deletingTaskId,
    handleToggleTask,
    handleDeleteTask,
    handleEditTask,
    handleSaveEdit,
    handleCancelEdit,
    createMutation,
    deleteMutation,
    updateMutation,
  } = useTaskOperations();

  // Search state
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage, setTasksPerPage] = useState<PageSizeOption>(
    PAGINATION_CONFIG.DEFAULT_TASKS_PER_PAGE
  );

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Reset to page 1 when filter, page size, or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter, tasksPerPage, debouncedSearch]);

  // Escape key handler for modal and search
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isModalOpen) {
          setIsModalOpen(false);
        } else if (searchQuery) {
          setSearchQuery("");
        }
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isModalOpen, searchQuery]);

  const { data: taskResponse, isLoading } = useQuery({
    queryKey: [
      "tasks",
      currentPage,
      tasksPerPage,
      activeFilter,
      debouncedSearch,
    ],
    queryFn: () =>
      getTasks(currentPage, tasksPerPage, activeFilter, debouncedSearch),
    keepPreviousData: true,
  });

  const tasks = taskResponse?.data ?? [];
  const meta = taskResponse?.meta;

  const paginationData = useMemo(() => {
    const totalPages = meta?.totalPages ?? 1;
    const currentTasks = tasks;

    return {
      totalPages,
      currentTasks,
      hasNextPage: meta?.hasNextPage ?? false,
      hasPreviousPage: meta?.hasPreviousPage ?? false,
    };
  }, [tasks, meta]);

  // Adjust current page if it exceeds total pages after filtering/searching
  useEffect(() => {
    if (meta && currentPage > meta.toalPages) {
      setCurrentPage(meta.totalPages);
    }
  }, [meta?.totalPage]);

  // Search handlers
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  // Pagination handlers
  const handlePreviousPage = () => {
    if (paginationData.hasPreviousPage) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (paginationData.hasNextPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleLastPage = () => {
    setCurrentPage(paginationData.totalPages);
  };

  // Keyboard navigation for pagination
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if (e.key === "ArrowLeft" && paginationData.hasPreviousPage) {
        e.preventDefault();
        handlePreviousPage();
      } else if (e.key === "ArrowRight" && paginationData.hasNextPage) {
        e.preventDefault();
        handleNextPage();
      } else if (e.key === "Home" && currentPage !== 1) {
        e.preventDefault();
        handleFirstPage();
      } else if (e.key === "End" && currentPage !== paginationData.totalPages) {
        e.preventDefault();
        handleLastPage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPage, paginationData]);

  // Helper function to get result description
  const getResultDescription = () => {
    const isSearching = debouncedSearch.trim().length > 0;
    const isFiltering = activeFilter !== "ALL";

    let description = "";

    if (isSearching && isFiltering) {
      description = `${activeFilter.toLowerCase()} tasks matching "${debouncedSearch}"`;
    } else if (isSearching) {
      description = `tasks matching "${debouncedSearch}"`;
    } else if (isFiltering) {
      description = `${activeFilter.toLowerCase()} tasks`;
    } else {
      description = "tasks";
    }

    return `${meta?.total ?? tasks.length} ${description}`;
  };
  getResultDescription();

  // scroll to top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    <main className="bg-gray-100 min-h-screen flex justify-center ">
      <section className="w-full max-w-2xl mx-auto p-4">
        {/* Search Input */}
        <div className="mb-4">
          <div className="fixed max-w-[40rem] mx-auto w-full z-50 bg-gray-100">
            <input
              type="text"
              placeholder="Search tasks by title, description, or tags..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full py-2 px-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                aria-label="Clear search"
              >
                <IoIosClose size={24} />
              </button>
            )}
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <IoIosSearch />
            </div>
          </div>
          {debouncedSearch && (
            <div className="mt-2 text-xs text-gray-500">
              Press Escape to clear search
            </div>
          )}
        </div>

        <h1 className="font-extrabold text-3xl mb-5 text-center mt-20">
          My Todo App
        </h1>

        <TaskFormModal
          onCreateTask={createMutation.mutateAsync}
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
        />

        <TaskFilterButtons
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />

        {/* Enhanced results info */}
        {!isLoading && tasks.length > 0 && (
          <div className="mb-4 flex justify-between items-center text-sm text-gray-600">
            <div>
              Showing page {meta?.page} of {paginationData.totalPages}
            </div>

            {/* Page size selector */}
            <div className="flex items-center gap-2">
              <span>Show:</span>
              <select
                value={tasksPerPage}
                onChange={(e) =>
                  setTasksPerPage(Number(e.target.value) as PageSizeOption)
                }
                className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {PAGINATION_CONFIG.PAGE_SIZE_OPTIONS.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
              <span>per page</span>
            </div>
          </div>
        )}

        {/* Display filtered and searched tasks */}
        {isLoading ? (
          Array.from({ length: 4 }).map((_, idx) => (
            <Skeleton
              key={idx}
              className="h-[7rem] w-full rounded-xl bg-black/10 mb-4"
            />
          ))
        ) : paginationData.currentTasks.length > 0 ? (
          <TaskList
            tasks={paginationData.currentTasks}
            editingTaskId={editingTask}
            editForms={editForms}
            onEditChange={(id, field, value) =>
              setEditForms((prev) => ({
                ...prev,
                [id]: { ...prev[id], [field]: value },
              }))
            }
            onSaveEdit={handleSaveEdit}
            onCancelEdit={handleCancelEdit}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            onToggle={handleToggleTask}
            updatingTaskId={updatingTaskId}
            deletingTaskId={deletingTaskId}
          />
        ) : (
          <div className="text-center text-gray-500 py-6">
            {debouncedSearch ? (
              <div>
                <p className="mb-2">
                  No tasks found matching "{debouncedSearch}"
                </p>
                {activeFilter !== "ALL" && (
                  <p className="text-xs">
                    in {activeFilter.toLowerCase()} tasks
                  </p>
                )}
              </div>
            ) : activeFilter === "ALL" ? (
              "No tasks here."
            ) : (
              `No ${activeFilter.toLowerCase()} tasks.`
            )}
          </div>
        )}

        {/* Enhanced pagination */}
        {paginationData.totalPages > 1 && (
          <PaginationControls
            currentPage={currentPage}
            totalPages={paginationData.totalPages}
            onPageChange={setCurrentPage}
          />
        )}

        <LoadingIndicator
          show={
            createMutation.isPending ||
            updateMutation.isPending ||
            deleteMutation.isPending
          }
        />
      </section>
    </main>
  );
};

export default TaskBoard;
