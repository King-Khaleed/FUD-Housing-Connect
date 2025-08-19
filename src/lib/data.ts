
import type { Property, Agent } from '@/lib/types';

export const agents: Agent[] = [
  {
    id: 1,
    name: "Malam Ibrahim Hassan",
    profileImage: "https://placehold.co/100x100.png",
    phone: "+234-801-234-5678",
    whatsapp: "+2348012345678",
    email: "ibrahim.hassan@fudhousing.com",
    verified: true,
    verificationLevel: "Premium",
    responseTime: "Usually responds within 2 hours",
    rating: 4.8,
    totalReviews: 35,
    properties: [1, 2, 3, 26, 27],
    joinedDate: "2023-06-15",
    bio: "Experienced property agent specializing in premium student accommodation near FUD campus. Your comfort is my priority."
  },
  {
    id: 2,
    name: "Aisha Bello",
    profileImage: "https://placehold.co/100x100.png",
    phone: "+234-802-345-6789",
    whatsapp: "+2348023456789",
    email: "aisha.bello@fudhousing.com",
    verified: true,
    verificationLevel: "Verified",
    responseTime: "Responds within 6 hours",
    rating: 4.5,
    totalReviews: 23,
    properties: [4, 5, 6, 28],
    joinedDate: "2023-08-01",
    bio: "Friendly and reliable agent connecting students with affordable and comfortable housing options. Let's find your new home!"
  },
  {
    id: 3,
    name: "Chinedu Okoro",
    profileImage: "https://placehold.co/100x100.png",
    phone: "+234-803-456-7890",
    whatsapp: "+2348034567890",
    email: "chinedu.okoro@fudhousing.com",
    verified: true,
    verificationLevel: "Verified",
    responseTime: "Responds within 24 hours",
    rating: 4.2,
    totalReviews: 18,
    properties: [7, 8, 9],
    joinedDate: "2023-10-20",
    bio: "Specializing in shared apartments and budget-friendly self-contain units. Let's find a place that fits your budget."
  },
  {
    id: 4,
    name: "Fatima Garba",
    profileImage: "https://placehold.co/100x100.png",
    phone: "+234-804-567-8901",
    whatsapp: "+2348045678901",
    email: "fatima.garba@fudhousing.com",
    verified: false,
    verificationLevel: "Basic",
    responseTime: "Responds within 2 days",
    rating: 3.9,
    totalReviews: 9,
    properties: [10, 11, 12],
    joinedDate: "2024-01-05",
    bio: "New agent on the platform, eager to help students find their ideal housing."
  },
  {
    id: 5,
    name: "Adewale Adebayo",
    profileImage: "https://placehold.co/100x100.png",
    phone: "+234-805-678-9012",
    whatsapp: "+2348056789012",
    email: "adewale.adebayo@fudhousing.com",
    verified: true,
    verificationLevel: "Premium",
    responseTime: "Usually responds within 1 hour",
    rating: 4.9,
    totalReviews: 42,
    properties: [13, 14, 15, 29, 30],
    joinedDate: "2022-11-11",
    bio: "Top-rated agent with exclusive listings in the most sought-after locations. Committed to providing excellent service."
  },
  {
    id: 6,
    name: "Halima Abubakar",
    profileImage: "https://placehold.co/100x100.png",
    phone: "+234-806-789-0123",
    whatsapp: "+2348067890123",
    email: "halima.abubakar@fudhousing.com",
    verified: true,
    verificationLevel: "Verified",
    responseTime: "Responds within 4 hours",
    rating: 4.6,
    totalReviews: 28,
    properties: [16, 17, 18],
    joinedDate: "2023-03-18",
    bio: "Your trusted partner for finding safe and secure accommodation. I focus on properties with excellent security features."
  },
  {
    id: 7,
    name: "Yusuf Mohammed",
    profileImage: "https://placehold.co/100x100.png",
    phone: "+234-807-890-1234",
    whatsapp: "+2348078901234",
    email: "yusuf.mohammed@fudhousing.com",
    verified: false,
    verificationLevel: "Basic",
    responseTime: "Responds within 3 days",
    rating: 3.5,
    totalReviews: 5,
    properties: [19, 20],
    joinedDate: "2024-02-10",
    bio: "Part-time agent with a few good properties available."
  },
  {
    id: 8,
    name: "Ngozi Okafor",
    profileImage: "https://placehold.co/100x100.png",
    phone: "+234-808-901-2345",
    whatsapp: "+2348089012345",
    email: "ngozi.okafor@fudhousing.com",
    verified: true,
    verificationLevel: "Verified",
    responseTime: "Responds within 8 hours",
    rating: 4.4,
    totalReviews: 21,
    properties: [21, 22, 23, 24, 25],
    joinedDate: "2023-09-01",
    bio: "I manage a variety of properties to suit different needs, from single rooms to family-sized apartments for post-graduate students."
  }
];

const generateMockProperties = () => {
  const baseProperties: Property[] = [
      {
        id: 1,
        title: "Modern 2-Bedroom Near FUD Main Gate",
        price: 180000,
        priceType: "annual",
        location: {
          area: "Main Gate Area",
          address: "123 University Rd, Behind FUD Main Gate, Dutse",
          distanceFromCampus: "Walking distance",
          coordinates: { lat: 11.7447, lng: 9.3337 }
        },
        roomType: "2-Bedroom",
        size: "Standard",
        images: ["https://placehold.co/600x400.png", "https://placehold.co/600x400.png", "https://placehold.co/600x400.png"],
        amenities: ["Water", "Electricity", "Security", "Parking", "Kitchen"],
        description: "A well-furnished and modern 2-bedroom apartment perfect for students who value comfort and proximity to campus. Features a spacious living room and tiled floors.",
        agentId: 1,
        available: true,
        featured: true,
        dateAdded: "2024-07-15",
        views: 245,
        inquiries: 12,
        verified: true
      },
      {
        id: 2,
        title: "Cozy Self-Contain at Gida Dubu",
        price: 80000,
        priceType: "annual",
        location: {
          area: "Gida Dubu",
          address: "45 Gida Dubu Estate, Dutse",
          distanceFromCampus: "10-15 mins drive",
          coordinates: { lat: 11.7211, lng: 9.3458 }
        },
        roomType: "Self-contain",
        size: "Compact",
        images: ["https://placehold.co/600x400.png", "https://placehold.co/600x400.png"],
        amenities: ["Water", "Electricity"],
        description: "Affordable and clean self-contain room in a quiet and secure neighborhood. Ideal for students on a budget.",
        agentId: 1,
        available: true,
        featured: false,
        dateAdded: "2024-07-12",
        views: 150,
        inquiries: 8,
        verified: true
      },
      {
        id: 3,
        title: "Premium 1-Bedroom with WiFi",
        price: 150000,
        priceType: "annual",
        location: {
          area: "Dutse Township",
          address: "78 Central Market Road, Dutse",
          distanceFromCampus: "5-10 mins drive",
          coordinates: { lat: 11.7589, lng: 9.3391 }
        },
        roomType: "1-Bedroom",
        size: "Spacious",
        images: ["https://placehold.co/600x400.png", "https://placehold.co/600x400.png", "https://placehold.co/600x400.png"],
        amenities: ["Water", "Electricity", "Security", "WiFi", "Parking", "Kitchen"],
        description: "Experience comfort in this premium 1-bedroom flat with constant power supply and high-speed internet. Fully tiled with modern fittings.",
        agentId: 1,
        available: false,
        featured: true,
        dateAdded: "2024-07-01",
        views: 350,
        inquiries: 25,
        verified: true
      },
      {
        id: 4,
        title: "Affordable Shared Apartment",
        price: 50000,
        priceType: "annual",
        location: {
          area: "New Site",
          address: "Block 5, New Site Hostels, Dutse",
          distanceFromCampus: "10+ mins drive",
          coordinates: { lat: 11.7015, lng: 9.3562 }
        },
        roomType: "Shared Apartment",
        size: "Standard Room",
        images: ["https://placehold.co/600x400.png"],
        amenities: ["Water", "Electricity"],
        description: "A room in a 3-bedroom shared apartment. A very cheap option for students looking to save cost. Shared kitchen and bathroom.",
        agentId: 2,
        available: true,
        featured: false,
        dateAdded: "2024-07-18",
        views: 95,
        inquiries: 5,
        verified: true
      },
      {
        id: 5,
        title: "Spacious Self-Contain near Campus",
        price: 100000,
        priceType: "annual",
        location: {
          area: "Main Gate Area",
          address: "24 Student Villa, Off University Rd, Dutse",
          distanceFromCampus: "Walking distance",
          coordinates: { lat: 11.7455, lng: 9.3340 }
        },
        roomType: "Self-contain",
        size: "Large",
        images: ["https://placehold.co/600x400.png", "https://placehold.co/600x400.png"],
        amenities: ["Water", "Electricity", "Kitchen", "Security"],
        description: "A large self-contain apartment just a stone's throw from the campus main gate. Comes with a kitchenette and a private bathroom.",
        agentId: 2,
        available: true,
        featured: true,
        dateAdded: "2024-07-16",
        views: 410,
        inquiries: 15,
        verified: true
      }
  ];

  const additionalProperties: Property[] = [];
  for (let i = 0; i < 25; i++) {
    const propertyId = i + 6;
    const agent = agents[i % agents.length];
    const roomTypes: Property['roomType'][] = ['Self-contain', '1-Bedroom', '2-Bedroom', 'Shared Apartment'];
    const roomType = roomTypes[i % roomTypes.length];
    const price = 50000 + (i * 14000);
    const areas = ['Main Gate Area', 'Dutse Township', 'Gida Dubu', 'New Site', 'Takur'];
    const distances = ['Walking distance', '5-10 mins drive', '10+ mins drive'];
    const allAmenities = ["Water", "Electricity", "Security", "WiFi", "Parking", "Kitchen", "Furnished"];
    
    const propertyAmenities = allAmenities.slice(0, (i % 5) + 2);
    if (!propertyAmenities.includes('Water')) propertyAmenities.push('Water');
    if (!propertyAmenities.includes('Electricity')) propertyAmenities.push('Electricity');

    additionalProperties.push({
      id: propertyId,
      title: `${roomType} in ${areas[i % areas.length]}`,
      price: Math.round(price / 1000) * 1000,
      priceType: 'annual',
      location: {
        area: areas[i % areas.length],
        address: `${i + 10} Random Street, Dutse`,
        distanceFromCampus: distances[i % distances.length],
        coordinates: { lat: 11.74 + (i * 0.001) - 0.005, lng: 9.33 + (i * 0.001) - 0.005 }
      },
      roomType: roomType,
      size: ['Compact', 'Standard', 'Spacious'][i % 3],
      images: ["https://placehold.co/600x400.png", "https://placehold.co/600x400.png"],
      amenities: propertyAmenities,
      description: "A decent accommodation option for students. Contact the agent for more details and viewing arrangements.",
      agentId: agent.id,
      available: (i % 4) !== 0,
      featured: (i % 5) === 0,
      dateAdded: `2024-0${Math.floor(i / 5) + 1}-${ (i % 28) + 1}`,
      views: 50 + (i * 15),
      inquiries: 5 + i,
      verified: agent.verified,
    });
  }
  return [...baseProperties, ...additionalProperties];
}


export const properties: Property[] = generateMockProperties();


export function getAgentById(id: number): Agent | undefined {
  return agents.find(agent => agent.id === id);
}

export function getPropertyById(id: number): Property | undefined {
  return properties.find(property => property.id === id);
}

export function getPropertiesByAgent(agentId: number): Property[] {
  return properties.filter(property => property.agentId === agentId);
}
