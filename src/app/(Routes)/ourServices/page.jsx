import React from "react";
import { Bebas_Neue } from "next/font/google";
import { Card, CardContent } from "@/components/card";
import { Button } from "@/components/button";
import { Separator } from "@/components/separator";

export default function Services() {
  const portfolioItems = [
    {
      id: 1,
      title: "Branding for EcoTech",
      category: "Branding",
      image:
        "https://c.animaapp.com/Rk55Ds6J/img/a-modern-logo-design-with-green-leaves-and-a-sleek-font-represen@2x.png",
    },
    {
      id: 2,
      title: "Social Media Campaign for FreshBrew",
      category: "Social Media",
      image:
        "https://c.animaapp.com/Rk55Ds6J/img/a-group-of-friends-sitting-at-a-rustic-wooden-table-in-a-cozy-ca@2x.png",
    },
    {
      id: 3,
      title: "Digital Marketing for TechWave",
      category: "Digital Marketing",
      image:
        "https://c.animaapp.com/Rk55Ds6J/img/a-group-of-professionals-collaborating-around-a-table-with-lapto@2x.png",
    },
    {
      id: 4,
      title: "Website Design for Artify",
      category: "Design",
      image:
        "https://c.animaapp.com/Rk55Ds6J/img/a-modern-workspace-with-a-computer-displaying-a-colorful-website@2x.png",
    },
  ];
  return (
    <div className="flex flex-col min-h-screen items-start px-12 py-0 relative bg-gray-900">
      <header className="flex items-center justify-between px-0 py-4 w-full bg-gray-900">
      </header>

      <main className="w-full px-0 py-12">
        <h2 className="text-center text-5xl text-white font-bold pt-12 ">Our Work</h2>
        <Separator className="w-full my-4" />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 py-12">
          {portfolioItems.map((item) => (
            <Card key={item.id} className="shadow-md">
              <div
                className="h-48 bg-cover bg-center"
                style={{ backgroundImage: `url(${item.image})` }}
              />
              <CardContent className="p-4">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-gray-500">{item.category}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
