import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ShoppingCart, BarChart3, ShieldCheck } from 'lucide-react';

export default function MotivationPage(){
  return (
        <section className="relative hidden lg:flex min-h-[calc(100vh-96px)]  items-center justify-center overflow-hidden  px-16 text-white">

            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,white,transparent_30%),radial-gradient(circle_at_80%_70%,white,transparent_25%)]" />

                <div className="relative max-w-xl space-y-8">
                    <div className='space-y-4'>
                        <h1 className='text-5xl font-semibold tracking-tight'>Bem-vindo de volta a compras mais inteligentes.</h1>
                        <p className='text-blue-100 text-lg'>Acompanhe experiências, aprenda com compras passadas e tome decisões melhores no futuro.</p>
                    </div>
                <div className='grid gap-4'>
                    <Card className='bg-white/10 border-white/20 text-base text-white'>
                        <CardContent className='p-4 flex items-center gap-3'><BarChart3 className='h-5 w-5'/><span>Descubra padrões nos seus hábitos de gasto</span></CardContent>
                    </Card>
                    <Card className='bg-white/10 border-white/20 text-base text-white'>
                        <CardContent className='p-4 flex items-center gap-3'><ShoppingCart className='h-5 w-5'/><span>Mantenha seu histórico de compras organizado e seguro</span></CardContent>
                    </Card>
                </div>
            </div>
        </section> 
    );
}