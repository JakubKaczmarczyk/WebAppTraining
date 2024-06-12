namespace API.DTOs
{
    public class AdUpdateDto
    {
        public int Id {get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Street { get; set; }
        public string HomeNr { get; set; }
        public string PhoneNr { get; set; }
    }
}