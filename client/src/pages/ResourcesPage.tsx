import { useState } from "react";
import { mockResources } from "@/data/mockResources";
import { resourceCategories, resourceTags } from "@/data/resourceTags";
import { formatDate, pluralizeCommentCount } from "@/utils/resourceUtils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NotFound } from "@/components/error/NotFound";
import TransitionEffect from "@/components/ui/TransitionEffect";

const ResourcesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const filteredResources = mockResources.filter((resource) => {
    const matchesSearchTerm =
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory
      ? resource.category === selectedCategory
      : true;

    const matchesTags =
      selectedTags.length > 0
        ? selectedTags.every((tag) => resource.tags.includes(tag))
        : true;

    return matchesSearchTerm && matchesCategory && matchesTags;
  });

  return (
    <div className="container mx-auto p-4">
      <TransitionEffect />
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mt-20 mb-4 p-2 border rounded w-full"
      />

      <div className="mb-4">
        <h2 className="font-semibold mb-2">Category</h2>
        <div className="flex gap-2 flex-wrap">
          {resourceCategories.map((category) => (
            <button
              key={category}
              onClick={() =>
                setSelectedCategory(
                  category === selectedCategory ? null : category
                )
              }
              className={`px-3 py-1 border rounded ${
                selectedCategory === category
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <h2 className="font-semibold mb-2 w-full">Tags</h2>
        {resourceTags.map((tag) => (
          <button
            key={tag}
            onClick={() =>
              setSelectedTags((prevTags) =>
                prevTags.includes(tag)
                  ? prevTags.filter((t) => t !== tag)
                  : [...prevTags, tag]
              )
            }
            className={`px-3 py-1 border rounded ${
              selectedTags.includes(tag)
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {filteredResources.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <Card
              key={resource.id}
              className="shadow-lg hover:shadow-xl transition-shadow duration-200"
            >
              <CardHeader>
                <div className="mb-4">
                  <img
                    src={resource.imageUrl}
                    alt={resource.title}
                    className="w-full h-40 object-cover rounded-t-lg"
                  />
                </div>
                <CardTitle>{resource.title}</CardTitle>
                <CardDescription className="text-xs text-gray-500 mt-1">
                  {formatDate(resource.date)} ·{" "}
                  {pluralizeCommentCount(resource.comments)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>{resource.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <NotFound />
      )}
    </div>
  );
};

export default ResourcesPage;
