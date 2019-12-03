﻿using AutoMapper;
using LingiWebApplication.Data.Models;
using LingiWebApplication.ViewModels;
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
                .ForMember(destination => destination.Category,
                opts => opts.MapFrom(source => source.Category.Name))
                .ForMember(destination => destination.Level,
                opts => opts.MapFrom(source => source.Level.Name));
        }
    }
}