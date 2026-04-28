'use client';
import { useState } from 'react';
import { toast } from 'sonner';
import { Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import ProductSelector, { Product } from '../../../components/new-experience/product-selector';
import AddProductModal from '../../../components/new-experience/add-product-modal';
import ExperienceDetails from '../../../components/new-experience/new-experience-details';
import ReflectionSection from '../../../components/new-experience/reflection-section';

const SEED_PRODUCTS: Product[] = [
  { id: 'p-1', name: 'AirPods Pro (2nd gen)', brand: 'Apple', category: 'Electronics' },
  { id: 'p-2', name: 'Kindle Paperwhite', brand: 'Amazon', category: 'Electronics' },
  { id: 'p-3', name: 'Nespresso Vertuo Plus', brand: 'Nespresso', category: 'Home & Kitchen' },
  { id: 'p-4', name: 'V15 Detect Cordless Vacuum', brand: 'Dyson', category: 'Home & Kitchen' },
  { id: 'p-5', name: 'WH-1000XM5 Headphones', brand: 'Sony', category: 'Electronics' },
  { id: 'p-6', name: 'Instant Pot Duo 7-in-1', brand: 'Instant Pot', category: 'Home & Kitchen' },
];

export default function NewExperiencePage() {
  const [products, setProducts] = useState<Product[]>(SEED_PRODUCTS);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [rating, setRating] = useState(0);
  const [wouldBuyAgain, setWouldBuyAgain] = useState(true);
  const [price, setPrice] = useState('');
  const [date, setDate] = useState<Date>(new Date());

  const [reason, setReason] = useState('');
  const [negativeAspects, setNegativeAspects] = useState<string[]>([]);
  const [notes, setNotes] = useState('');

  const handleCreateProduct = (product: Product) => {
    setProducts((prev) => [product, ...prev]);
    setSelectedId(product.id);
    toast.success('Product added', {
      description: `${product.name} is now available for selection.`,
    });
  };

  const canSubmit = selectedId && rating > 0 && price && reason;

  const handleSave = () => {
    if (!canSubmit) {
      toast.error('Please complete the required fields', {
        description: 'Product, rating, price and reason are required.',
      });
      return;
    }
    toast.success('Experience saved', {
      description: 'Your purchase experience has been recorded.',
    });
    // reset
    setSelectedId(null);
    setRating(0);
    setWouldBuyAgain(true);
    setPrice('');
    setDate(new Date());
    setReason('');
    setNegativeAspects([]);
    setNotes('');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mt-4">
        <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">
          Log a new purchase experience
        </h1>
        <p className="text-gray-500 mt-2">
          Capture how a product performed so you can make smarter decisions next time.
        </p>
      </div>

      {/* Product Selection */}
      <Card className="border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Product</CardTitle>
          <CardDescription>Select an existing product or add a new one to your catalog.</CardDescription>
        </CardHeader>
        <CardContent>
          <ProductSelector
            products={products}
            selectedId={selectedId}
            onSelect={setSelectedId}
            onAddNew={() => setModalOpen(true)}
          />
        </CardContent>
      </Card>

      {/* Experience Details */}
      <Card className="border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Experience details</CardTitle>
          <CardDescription>Rate this purchase and record the key facts.</CardDescription>
        </CardHeader>
        <CardContent>
          <ExperienceDetails
            rating={rating}
            onRatingChange={setRating}
            wouldBuyAgain={wouldBuyAgain}
            onWouldBuyAgainChange={setWouldBuyAgain}
            price={price}
            onPriceChange={setPrice}
            date={date}
            onDateChange={setDate}
          />
        </CardContent>
      </Card>

      {/* Reflection */}
      <Card className="border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Reflection</CardTitle>
          <CardDescription>Reflect on why you bought it and what could be better.</CardDescription>
        </CardHeader>
        <CardContent>
          <ReflectionSection
            reason={reason}
            onReasonChange={setReason}
            negativeAspects={negativeAspects}
            onNegativeAspectsChange={setNegativeAspects}
            notes={notes}
            onNotesChange={setNotes}
          />
        </CardContent>
      </Card>

      {/* Submit */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <Button
          variant="outline"
          className="!bg-transparent hover:!bg-gray-50"
          onClick={() => {
            setSelectedId(null);
            setRating(0);
            setWouldBuyAgain(true);
            setPrice('');
            setDate(new Date());
            setReason('');
            setNegativeAspects([]);
            setNotes('');
          }}
        >
          Reset
        </Button>
        <Button
          size="lg"
          onClick={handleSave}
          className="bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
        >
          <Save className="h-4 w-4 mr-2" />
          Save Experience
        </Button>
      </div>

      <AddProductModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        onCreate={handleCreateProduct}
      />
    </div>
  );
}