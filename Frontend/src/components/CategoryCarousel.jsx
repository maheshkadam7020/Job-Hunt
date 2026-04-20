import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchQuery } from "@/redux/jobSlice";

const CategoryCarousel = () => {
  const jobCategories = [
    "Software Development",
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Data Science",
    "Machine Learning",
    "Artificial Intelligence",
    "Cyber Security",
    "Cloud Computing",
    "DevOps",
    "Mobile App Development",
    "UI/UX Design",
    "Graphic Design",
    "Digital Marketing",
    "Content Writing",
    "SEO Specialist",
    "Sales",
    "Marketing",
    "Human Resources",
    "Finance",
  ];
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const searchHandler=(text)=>{
      dispatch(setSearchQuery(text));
      navigate('/browse')
    }
  return (
    <div className="w-full py-8 overflow-hidden">
      <Carousel
        opts={{ align: "start", loop: true }}
        className="w-full max-w-7xl mx-auto"
      >
        <CarouselContent>
          {jobCategories.map((category, index) => (
            <CarouselItem
              key={index}
              className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
            >
              <div className="px-2">
                <Button
                  variant="outline"
                  onClick={()=>{
                    searchHandler(category)
                  }}
                  className="w-full rounded-full text-sm sm:text-base truncate hover:bg-[#6A38C2] hover:text-white"
                >
                  {category}
                </Button>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;