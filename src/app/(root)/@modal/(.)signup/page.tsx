import {Modal} from "@/components/UI/modal";
import AuthForm from "@/components/authForm/authForm";

export default async function Page() {
    return (
        <Modal>
            <AuthForm type={'signup'}/>
        </Modal>
    )
}