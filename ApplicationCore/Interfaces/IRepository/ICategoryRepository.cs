﻿using ApplicationCore.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace ApplicationCore.Interfaces.IRepository
{
    public interface ICategoryRepository : IAsyncRepository<Category>
    {
    }
}
