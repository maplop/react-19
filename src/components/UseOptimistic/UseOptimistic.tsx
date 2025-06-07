import { useOptimistic, useTransition, useState } from "react";

type Framework = {
  id: number;
  name: string;
  votes: number;
};

export const UseOptimistic = () => {
  const [isPending, startTransition] = useTransition();
  const [currentProcessingId, setCurrentProcessingId] = useState<number | null>(null);
  const [frameworks, setFrameworks] = useState<Framework[]>([
    { id: 1, name: 'Nextjs', votes: 120 },
    { id: 2, name: 'Vue', votes: 98 },
    { id: 3, name: 'Angular', votes: 85 },
    { id: 4, name: 'Svelte', votes: 64 }
  ]);

  const [optimisticFrameworks, setOptimisticFramework] = useOptimistic(
    frameworks,
    (currentState: Framework[], { frameworkId, adjustment }: { frameworkId: number; adjustment: number }) => {
      return currentState.map(framework =>
        framework.id === frameworkId
          ? { ...framework, votes: framework.votes + adjustment }
          : framework
      );
    }
  );

  const submitVote = async (): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return true;
  };

  const handleVote = async (frameworkId: number) => {
    setCurrentProcessingId(frameworkId);

    startTransition(async () => {
      setOptimisticFramework({ frameworkId, adjustment: 1 });
      await submitVote();

      setFrameworks(prev =>
        prev.map(f =>
          f.id === frameworkId
            ? { ...f, votes: f.votes + 1 }
            : f
        )
      );

      setCurrentProcessingId(null);
    });
  };

  return (
    <div>
      <h2 style={{ marginBottom: 32 }}>Vota por tu framework favorito</h2>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {optimisticFrameworks.map(framework => (
          <div
            key={framework.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              border: '1px solid #bfbfbf',
              borderRadius: 8,
              padding: '12px 8px'
            }}>
            <h4 style={{ margin: 0 }}>{framework.name}</h4>
            <span>{framework.votes} votos</span>
            <button
              onClick={() => handleVote(framework.id)}
              disabled={isPending && currentProcessingId === framework.id}
            >
              {isPending && currentProcessingId === framework.id
                ? "Procesando..."
                : "Votar"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
