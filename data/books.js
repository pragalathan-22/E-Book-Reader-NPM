export const booksData = [
  {
    id: 1,
    title: "1984",
    author: "George Orwell",
    description: "A dystopian novel about a totalitarian regime that uses surveillance and propaganda to control its citizens.",
    image: "https://picsum.photos/150/200?random=1",
    authorImage:"https://dummyimage.com/100x100/cccccc/000000&text=F.+Scott+Fitzgerald", // Use require() for local images
    chapters: [
      {
        title: "Chapter 1: The Principles of Newspeak",
        content: "Newspeak is the official language of Oceania and is designed to meet the ideological needs of Ingsoc."
      },
      {
        title: "Chapter 2: The Telescreens",
        content: "The telescreen received and transmitted simultaneously. Any sound that Winston made, above the level of a very low whisper, would be picked up by it."
      }
    ],
    suggestedBooks: ["1984", "Animal Farm", "Brave New World"],
  },
  {
    id: 2,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    description: "A novel set in the 1920s about the enigmatic Jay Gatsby and his unrequited love for Daisy Buchanan.",
    image: "https://dummyimage.com/150x200/cccccc/000000&text=Book+Image",
    authorImage: "https://dummyimage.com/100x100/cccccc/000000&text=F.+Scott+Fitzgerald", // Remote URL for image
    chapters: [
      {
        title: "Chapter 1: In My Younger and More Vulnerable Years",
        content: "In my younger and more vulnerable years, my father gave me some advice that I’ve been turning over in my mind ever since.",
      },
      {
        title: "Chapter 2: The Valley of Ashes",
        content: "This is a valley of ashes—a fantastic farm where ashes grow like wheat into ridges and hills and grotesque gardens."
      }
    ],
    suggestedBooks: ["Tender is the Night", "This Side of Paradise"],
  },
];
