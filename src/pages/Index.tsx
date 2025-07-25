
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Code2, Database, Brain, Shield, TrendingUp, Users, Zap, Globe, Lock, AlertTriangle } from "lucide-react";

const Index = () => {
  const projects = [
    {
      title: "AI Ethics & Bias Detection Tool",
      description: "Detect and mitigate bias in ML models with fairness metrics and explainable AI",
      icon: Brain,
      tags: ["Machine Learning", "Ethics", "Fairlearn", "SHAP"],
      path: "/bias-detection",
      color: "bg-purple-500"
    },
    {
      title: "Fraud Detection System",
      description: "Real-time fraud detection using anomaly detection and ensemble methods",
      icon: Shield,
      tags: ["ML", "XGBoost", "Kafka", "Elasticsearch"],
      path: "/fraud-detection", 
      color: "bg-red-500"
    }
  ];

  const skills = [
    { name: "React/TypeScript", level: 95 },
    { name: "Machine Learning", level: 88 },
    { name: "Python/Scikit-learn", level: 92 },
    { name: "Data Engineering", level: 85 },
    { name: "Cloud Platforms", level: 80 },
    { name: "API Development", level: 90 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Data Science & ML Portfolio
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Showcasing cutting-edge machine learning projects that solve real-world problems
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge className="bg-white/20 text-white px-4 py-2 text-lg">
                <Brain className="w-5 h-5 mr-2" />
                AI/ML Engineer
              </Badge>
              <Badge className="bg-white/20 text-white px-4 py-2 text-lg">
                <Database className="w-5 h-5 mr-2" />
                Data Scientist
              </Badge>
              <Badge className="bg-white/20 text-white px-4 py-2 text-lg">
                <Code2 className="w-5 h-5 mr-2" />
                Full-Stack Developer
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Enterprise-ready solutions demonstrating advanced ML capabilities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:scale-105">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-lg ${project.color} text-white`}>
                    <project.icon className="w-8 h-8" />
                  </div>
                  <Link to={project.path}>
                    <Button className="opacity-0 group-hover:opacity-100 transition-opacity">
                      View Project
                    </Button>
                  </Link>
                </div>
                <CardTitle className="text-xl">{project.title}</CardTitle>
                <CardDescription className="text-base">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-sm">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Technical Expertise
            </h2>
            <p className="text-xl text-gray-600">
              Core competencies in modern data science and engineering
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skills.map((skill) => (
              <div key={skill.name} className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-900">{skill.name}</span>
                  <span className="text-gray-600">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Employers Love These Projects */}
      <section className="py-16 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Employers Value These Skills
            </h2>
            <p className="text-xl text-gray-600">
              Demonstrating real business impact and technical excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <TrendingUp className="w-12 h-12 mx-auto text-green-600 mb-4" />
                <CardTitle>Business Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Projects demonstrate understanding of ROI, cost savings, and measurable business outcomes
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Shield className="w-12 h-12 mx-auto text-blue-600 mb-4" />
                <CardTitle>Enterprise Ready</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Production-grade solutions addressing real industry challenges like fraud and bias
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Brain className="w-12 h-12 mx-auto text-purple-600 mb-4" />
                <CardTitle>Technical Depth</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Advanced ML techniques, modern tech stacks, and best practices in data science
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Build Something Amazing?</h3>
            <p className="text-gray-300 mb-6">
              Explore these projects to see how modern ML can solve complex business problems
            </p>
            <div className="flex justify-center space-x-4">
              <Button asChild size="lg">
                <Link to="/bias-detection">View AI Ethics Tool</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-gray-900">
                <Link to="/fraud-detection">View Fraud Detection</Link>
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
