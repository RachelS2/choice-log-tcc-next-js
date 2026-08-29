import { Label } from "@/components/ui/label";
import { changePasswordSchema, ChangePasswordSchemaType } from "@/zod-schemas/user-settings";
import { FieldErrors, Path, useForm, UseFormRegister } from "react-hook-form";
import PasswordInput from "../../sign-in/password-input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { updatePassword } from "@/lib/repository/user-repository";
import { zodResolver } from "@hookform/resolvers/zod";


type PasswordInputType = {
    label: "Senha atual" | "Nova senha" | "Confirmar senha";
    register: UseFormRegister<ChangePasswordSchemaType>;
    name: Path<ChangePasswordSchemaType>;
    error?: string
}
function CreatePasswordInput({
    label,
    register,
    name,
    error
}: PasswordInputType) {
    return (
        <div className="space-y-2 text-blue-500">
            <Label>{label}</Label>
            <PasswordInput
                register={register}
                name={name}
                className="border border-blue-200 bg-white/80 shadow-sm"
            />
            {error && (
                <p className="text-sm text-red-500">{error}</p>
            )}
        </div>
    );
}

type ChangePasswordFormSettingsProps = {
    onCancel?: () => void;
    onPasswordChanged?: () => void;
    justifyButtons?: "start" | "center";
};


export function ChangePasswordFormSettings({
    onCancel,
    onPasswordChanged,
    justifyButtons = "start",
}: ChangePasswordFormSettingsProps) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isDirty, isSubmitting }
    } = useForm<ChangePasswordSchemaType>({
        resolver: zodResolver(changePasswordSchema),
        mode: "onChange",

    });
    const handleChangePassword = async (data: ChangePasswordSchemaType) => {
        const loadingToast = toast.loading("Atualizando senha...");
        const result = await updatePassword(data);

        toast.dismiss(loadingToast);

        if (result.success) {
            toast.success("Senha atualizada com sucesso.");
            onPasswordChanged?.()
        } else {
            toast.error(result.message);
        }
    };
    const handleCancelChangePassword = () => {
        onCancel?.()
        reset()
    }
    return (
        <form onSubmit={handleSubmit(handleChangePassword)} className="bg-blue-50 border border-blue-200 p-4 shadow-sm rounded-xl">
            <div
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
                <CreatePasswordInput
                    error={errors.password?.message}
                    name="password"
                    register={register}
                    label="Senha atual"
                />

                <CreatePasswordInput
                    error={errors.newPassword?.message}
                    name="newPassword"
                    register={register}
                    label="Nova senha"
                />

                <CreatePasswordInput
                    error={errors.confirmPassword?.message}
                    name="confirmPassword"
                    register={register}
                    label="Confirmar senha"
                />
            </div>

            <div className={`flex justify-${justifyButtons} pt-6 gap-2`}>
                {onCancel ? <Button
                    type="button"
                    variant="ghost"
                    className="w-24 h-9 text-blue-500 bg-white/80 shadow-md hover:text-blue-600"
                    onClick={handleCancelChangePassword}
                >
                    Cancelar
                </Button>
                    : <></>
                }

                <Button
                    type="submit"
                    disabled={
                        !isDirty ||
                        isSubmitting ||
                        Object.keys(errors).length > 0
                    }
                    className="bg-blue-600 h-9 hover:bg-blue-500 shadow-lg"
                >
                    {isSubmitting ? "Atualizando..." : "Atualizar senha"}
                </Button>
            </div>
        </form>
    );
}