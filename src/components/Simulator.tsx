import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, Calculator, CheckCircle2 } from 'lucide-react';

export function Simulator({ onContact }: { onContact: (goal: string, credit: number, installment: number) => void }) {
  const [goal, setGoal] = useState('Imóveis');
  const [value, setValue] = useState(300000);
  const [installment, setInstallment] = useState(1500);

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value));
  };

  return (
    <div className="simulator-card" data-reveal>
      <div className="simulator-header">
        <span className="icon-bubble icon-bubble--lg"><Calculator /></span>
        <div>
          <h3>Simule seu objetivo</h3>
          <p>Descubra como o consórcio pode se encaixar no seu orçamento, sem juros e com flexibilidade.</p>
        </div>
      </div>
      <div className="simulator-body">
        <div className="simulator-controls">
          <label className="simulator-label">
            O que você quer conquistar?
            <select className="simulator-select" value={goal} onChange={(e) => setGoal(e.target.value)}>
              <option>Imóveis</option>
              <option>Veículos</option>
              <option>Serviços</option>
              <option>Investimentos</option>
            </select>
          </label>
          <label className="simulator-label">
            Valor do crédito: <strong>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(value)}</strong>
            <input type="range" min="50000" max="1000000" step="10000" value={value} onChange={handleValueChange} className="simulator-range" />
          </label>
          <div className="simulator-disclaimer">
            <CheckCircle2 size={14} /> Valores e prazos são referenciais e sujeitos a alterações da administradora.
          </div>
        </div>
        <div className="simulator-result">
          <span className="simulator-result-label">Parcela estimada a partir de</span>
          <div className="simulator-result-value">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(value * 0.005)}<small>/mês</small>
          </div>
          <Button variant="hero" size="portfolio" className="btn-pill w-full mt-4" onClick={() => onContact(goal, value, value * 0.005)}>
            Aprofundar simulação <ArrowUpRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
