'use client';
import { useState } from "react";
import {
  ShoppingBag,
  Brain,
  Star,
  ThumbsDown,
  FileText,
  ChevronRight,
  ChevronLeft,
  Check,
  Sparkles,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import IdentificationStep from "@/components/dashboard/experiences/new-experience/identification-step";
import { AddNewExperienceFormModel } from "@/models/dashboard/experiences";
import ContextStep from "@/components/dashboard/experiences/new-experience/context-step";
import FinalRatingStep from "@/components/dashboard/experiences/new-experience/final-rating-step";
import NegativeAspectsStep from "@/components/dashboard/experiences/new-experience/negative-aspects-step";
import DetailsStep from "@/components/dashboard/experiences/new-experience/details-step";
import Modal from "@/components/ui/modal";
import { useRouter } from "next/navigation";


const STEPS = [
  { title: "Identification", icon: ShoppingBag },
  { title: "Context", icon: Brain },
  { title: "Details", icon: FileText },
  { title: "Negative Aspects", icon: ThumbsDown },
  { title: "Final Rating", icon: Star },
];

export default function WizardForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const [formData, setFormData] = useState<AddNewExperienceFormModel>({
    item: "",
    date: new Date().toISOString().split("T")[0],
    price: "",
    reason: "",
    influence: "",
    rating: 0,
    wouldBuyAgain: false,
    negativeAspects: [],
    description: "",
    location: "",
  });

  const updateField = <K extends keyof AddNewExperienceFormModel>(field: K, value: AddNewExperienceFormModel[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const progress = ((currentStep + 1) / STEPS.length) * 100;

  const canProceed = () => {
    if (currentStep === 0) {
      return formData.item.trim() !== "" && formData.date !== "" && selectedItemId !== null;
    }
    return true;
  };

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };


  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      return;
    }

    setModalOpen(true);
  };

  const handleRouterBack = async () => {
    router.back();
  };

  const handleSave = () => {
    setIsSuccess(true);
  };

  const handleReset = () => {
    setFormData({
      item: "",
      date: new Date().toISOString().split("T")[0],
      price: "",
      reason: "",
      influence: "",
      rating: 0,
      wouldBuyAgain: false,
      negativeAspects: [],
      description: "",
      location: "",
    });
    setCurrentStep(0);
    setIsSuccess(false);
  };

  const handleSkipDetails = () => {
    handleSave();
  };

  if (isSuccess) {
    return (
      <Card className="w-full max-w-lg mx-auto border-0 shadow-xl bg-white/90 backdrop-blur-sm">
        <CardContent className="flex flex-col items-center justify-center py-16 px-8 text-center space-y-6">
          <div className="relative">
            <img
              src="https://mgx-backend-cdn.metadl.com/generate/images/1201351/2026-05-26/pkdfqoyaagwq/success-celebration.png"
              alt="Sucesso"
              className="w-32 h-32 object-contain animate-in zoom-in duration-500"
            />
            <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1.5 animate-in zoom-in delay-300 duration-300">
              <Check className="h-4 w-4 text-white" />
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-900">
              Experiência registrada!
            </h2>
            <p className="text-muted-foreground">
              Sua experiência com <span className="font-medium text-blue-600">{formData.item}</span> foi salva com sucesso.
            </p>
          </div>
          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleReset}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Registrar outra
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">

      <div className="absolute top-[-100px] left-[-100px] h-80 w-80 rounded-full bg-blue-300/20 blur-3xl" />

      <div className="absolute bottom-[-120px] right-[-120px] h-96 w-96 rounded-full bg-indigo-300/20 blur-3xl" />

      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-lg mx-auto shadow-2xl border-0 p-0 min-h-[510px]  bg-white backdrop-blur-sm">
          <CardContent className="p-0 flex flex-col h-full min-h-[500px]">
            {/* Progress Header */}
            <div className="px-6 pt-6 pb-4 space-y-4 ">
              <div className="flex items-center  justify-between">
                {STEPS.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <div
                      key={step.title}
                      className={`flex flex-col items-center gap-1 transition-all ${index === currentStep
                        ? "text-blue-600 scale-110"
                        : index < currentStep
                          ? "text-green-500"
                          : "text-gray-300"
                        }`}
                    >
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${index === currentStep
                          ? "bg-blue-100 ring-2 ring-blue-400"
                          : index < currentStep
                            ? "bg-green-100"
                            : "bg-gray-100"
                          }`}
                      >
                        {index < currentStep ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Icon className="h-4 w-4" />
                        )}
                      </div>
                      <span className="text-[10px] font-medium hidden sm:block">
                        {step.title}
                      </span>
                    </div>
                  );
                })}
              </div>
              <Progress value={progress} className="h-2 rounded-full  bg-slate-100" />
            </div>

            <div className="flex-1">
              <IdentificationStep currentStep={currentStep} formData={formData} updateField={updateField} selectedId={selectedItemId} setSelectedId={setSelectedItemId} />
              <ContextStep currentStep={currentStep} formData={formData} updateField={updateField} />
              <DetailsStep currentStep={currentStep} formData={formData} updateField={updateField} />
              <NegativeAspectsStep currentStep={currentStep} formData={formData} updateField={updateField} />
              <FinalRatingStep currentStep={currentStep} formData={formData} updateField={updateField} />
            </div>

            {/* Navigation */}
            <div className="h-20 flex items-center px-6 border-t border-gray-100 flex items-center">
              <div className="flex items-center justify-center gap-3">
              <>  
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handlePrev}
                  className="
                    gap-1
                    hover:bg-blue-100
                    hover:text-blue-700
                    transition-colors hover:font-bold
                  "
                >
                  <ChevronLeft className="h-4 w-4" />
                  Return
                </Button>

                  <Modal
                    open={modalOpen}
                    onOpenChange={setModalOpen}
                    onConfirm={handleRouterBack}
                    dialogTitle="Confirm Return"
                    dialogDescription="Are you sure you want to return to the dashboard page?"
                    buttonText="Return to Dashboard"
                  />
                </>
                <div className="flex items-center gap-2">
                  {currentStep < STEPS.length - 1 && currentStep > 0 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleSkipDetails}
                      className="
                      text-xs
                      border
                      border-blue-400
                      bg-white
                      text-blue-500
                      hover:bg-blue-100
                      hover:-translate-y-[1px]
                      hover:text-blue-700
                      shadow-[0_4px_12px_rgba(59,130,246,0.15)]
                      transition-all
                      duration-200">
                      Save and Continue Later
                    </Button>
                  )}

                  {currentStep < STEPS.length - 1 ? (
                    <Button
                      type="button"
                      onClick={handleNext}
                      disabled={!canProceed()}
                      className="bg-blue-600 hover:bg-blue-700 shadow-[0_4px_12px_rgba(59,130,246,0.15)] hover:-translate-y-[1px] text-white gap-1"
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      onClick={handleSave}
                      className="bg-blue-600 hover:bg-blue-700 text-white gap-1"
                    >
                      <Check className="h-4 w-4" />
                      Save Experience
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent >
        </Card >
      </div >
    </div >
  );
}