// export default function Team() {
//   const teamMembers = [
//     {
//       name: "Shova Sapkota",
//       role: "Frontend Developer",
//       img: "https://via.placeholder.com/150", // replace with real photo if available
//       bio: "Shova is responsible for designing the user interface and implementing React components.",
//     },
//     {
//       name: "Noyo Lama",
//       role: "Backend Developer",
//       img: "https://via.placeholder.com/150",
//       bio: "Noyo handles server-side logic, database management, and API integration.",
//     },
//     {
//       name: "Punam Nepali",
//       role: "Fullstack Developer",
//       img: "https://via.placeholder.com/150",
//       bio: "Punam coordinates the project, manages frontend-backend integration, and ensures smooth functionality.",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <h1 className="text-4xl font-bold text-center mb-6 text-pink-500">Our Team</h1>
//       <p className="text-center mb-12 text-gray-700 max-w-xl mx-auto">
//         This website is created as a college project by our team. We are learning and building
//         an Online Beauty Store for educational purposes.
//       </p>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//         {teamMembers.map((member) => (
//           <div
//             key={member.name}
//             className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-2xl transition-shadow"
//           >
//             <img
//               src={member.img}
//               alt={member.name}
//               className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
//             />
//             <h2 className="text-xl font-bold mb-1">{member.name}</h2>
//             <p className="text-pink-500 font-semibold mb-2">{member.role}</p>
//             <p className="text-gray-600 text-sm">{member.bio}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

export default function Team() {
  const teamMembers = [
    { name: "Noyo Lama" },
    { name: "Punam Nepali" },
    { name: "Shova Sapkota" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-serif text-center mb-6 text-pink-500">Our Team</h1>
      <p className="text-center mb-12 text-black max-w-xl mx-auto">
        This website is created as a college project by our team. We are learning and building
        an Online Beauty Store for educational purposes.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {teamMembers.map((member) => (
          <div
            key={member.name}
            className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-2xl transition-shadow"
          >
            <div className="w-32 h-32 rounded-full mx-auto mb-4 bg-pink-100 flex items-center justify-center text-pink-400 text-xl font-bold">
              {member.name.split(" ").map(n => n[0]).join("")}
            </div>
            <h2 className="text-xl font-bold mb-1">{member.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
