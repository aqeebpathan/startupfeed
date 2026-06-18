import Link from "next/link";
import Image from "next/image";
import { RiEyeLine } from "@remixicon/react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { formatDate } from "@/lib/utils";
import { urlFor } from "@/sanity/lib/image";
import { Author, Startup } from "@/sanity/types";

export type StartupCardType = Omit<Startup, "author"> & { author?: Author };

const StartupCard = ({ post }: { post: StartupCardType }) => {
  const {
    _id,
    author,
    _createdAt,
    views,
    title,
    description,
    category,
    image,
  } = post;
  return (
    <li>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center ">
            <p>{formatDate(_createdAt)}</p>

            <div className="flex items-center gap-1">
              <RiEyeLine size={14} />
              <span
                className="textsm
              "
              >
                {views}
              </span>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-5 mt-2">
            <div className="flex justify-between items-center gap-2">
              <div>
                <Link href={`/user/${author?._id}`}>
                  <p>{author?.name}</p>
                </Link>
                <CardTitle className="line-clamp-1">
                  <Link href={`/startup/${_id}`}>{title}</Link>
                </CardTitle>
              </div>

              <Link href={`/user/${author?._id}`} className="shrink-0">
                {author?.image ? (
                  <Image
                    src={author.image}
                    alt={author.name || "User"}
                    width={38}
                    height={38}
                    className="object-cover"
                  />
                ) : (
                  <div className="flex border text-muted-foreground h-9.5 w-9.5 items-center justify-center text-sm font-semibold">
                    {author?.name
                      ?.trim()
                      .split(/\s+/)
                      .slice(0, 2)
                      .map((word) => word[0]?.toUpperCase())
                      .join("") || "?"}
                  </div>
                )}
              </Link>
            </div>

            <Link href={`/startup/${_id}`}>
              <CardDescription className="line-clamp-2 leading-5 min-h-10">
                {description}
              </CardDescription>
            </Link>
          </div>
        </CardHeader>

        <CardContent>
          <Link href={`/startup/${post._id}`}>
            <div className="relative h-52 w-full overflow-hidden rounded-lg">
              <Image
                src={
                  image ? urlFor(image).url() : "https://placehold.co/600x400"
                }
                alt={title || "Startup Image"}
                fill
                className="object-cover"
              />
            </div>
          </Link>
        </CardContent>

        <CardFooter className="flex justify-between items-center">
          <Button variant={"link"} size={"sm"}>
            <Link href={`/?query=${category?.toLowerCase()}`}>
              {post.category}
            </Link>
          </Button>
          <Button size={"sm"}>
            <Link href={`/startup/${_id}`}>Details</Link>
          </Button>{" "}
        </CardFooter>
      </Card>
    </li>
  );
};

export default StartupCard;
