using Newtonsoft.Json;
using System;

namespace LingiWebApplication.ViewModels
{
    [JsonObject(MemberSerialization.OptOut)]
    public class TokenResponseViewModel
    {
        public TokenResponseViewModel()
        {

        }
        public string token { get; set; }
        public int expiration { get; set; }
    }
}
