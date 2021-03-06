﻿using AutoMapper;
using LingiWebApplication.Data.Models;
using LingiWebApplication.Data.Models.Tests;
using LingiWebApplication.ViewModels;
using LingiWebApplication.ViewModels.Tests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LingiWebApplication.Data
{
    public class WebMappingProfile : Profile
    {
        public WebMappingProfile()
        {
            CreateMap<Test, TestViewModel>()
                .ForMember(destination => destination.Type,
                opts => opts.MapFrom(source => source.Type.Name))
                .ForMember(destination => destination.Level,
                opts => opts.MapFrom(source => source.Level.Name));

            CreateMap<Flashcard, FlashcardViewModel>().ReverseMap();
;
        }
    }
}
