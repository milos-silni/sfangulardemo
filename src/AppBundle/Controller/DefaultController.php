<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

use Symfony\Component\HttpFoundation\JsonResponse;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\Response;

use Symfony\Component\Form\Extension\Core\Type\FileType;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;

use AppBundle\Entity\Product;


class DefaultController extends Controller
{
    /**
     * @Security("has_role('ROLE_USER')")
     * @Route("/", name="homepage")
     */
    public function indexAction(Request $request)
    {
        // replace this example code with whatever you need
        return $this->render('default/index.html.twig', array(
            'base_dir' => realpath($this->getParameter('kernel.root_dir').'/..'),
        ));
    }

    /**
     * @Route("/products/{page}", name="products", defaults={"page" = 0})
     * @Method({"GET"})
     */
    public function productsAction($page)
    {
        $repository = $this->getDoctrine()->getRepository('AppBundle:Product');
        
        if ($page > 0) {
            $offset = $page - 1;
        } else {
            $offset = 0;
        }
        
        $products = $repository->findBy([], [], 10, $offset * 10);
        $count = $repository->createQueryBuilder('n') ->select('count(n.id)')->getQuery()->getSingleScalarResult();
        $serializer = $this->get('serializer');
        $response = $serializer->serialize(['products' => $products, 'count' => $count], 'json');
        
        return new Response($response);
    }

    /**
     * @Route("/products", name="add_product")
     * @Method({"POST"})
     */
    public function addProductAction(Request $request)
    {
        $request->isXmlHttpRequest();
        $data = json_decode($request->getContent(), true);
        $request->request->replace($data);

        $form = $this->createFormBuilder(new Product(), array('csrf_protection' => false))
            ->add('name')
            ->add('price')
            ->add('description')
            ->add('image', FileType::class, array('required' => false))
            ->getForm();
        
        $form->submit($data);
        
        if ($form->isValid()) {
            $product = new Product();
            $product->setName($request->request->get('name'));
            $product->setPrice($request->request->get('price'));
            $product->setDescription($request->request->get('description'));
            $product->setImage($request->request->get('image'));

            $em = $this->getDoctrine()->getManager();
            $em->persist($product);
            $em->flush();

            return new JsonResponse(['status' => 'OK']);
            
        } else {
            $serializer = $this->get('jms_serializer');
            $errors = $serializer->serialize($form->getErrors(), 'json');

            return new JsonResponse(['status' => 'error', 'errors' => json_decode($errors)], 422);
        }
    }

    /**
     * @Route("/products/{id}", name="get_product")
     * @Method({"GET"})
     */
    public function getProductAction(Request $request)
    {
        $repository = $this->getDoctrine()->getRepository('AppBundle:Product');
        $products = $repository->find($request->get('id'));
        $serializer = $this->get('serializer');
        $json = $serializer->serialize($products, 'json');
        return new Response($json);
    }

    /**
     * @Route("/template/{template}", name="get_template")
     * @Method({"GET"})
     */
    public function getTemplateAction($template)
    {
        if ($this->get('templating')->exists(sprintf("default/%s.twig", $template))) {
            return $this->render(sprintf("default/%s.twig", $template));
        } else {
            return new JsonResponse(['message' => 'template not found'], 404);
        }
    }

    /**
     * @Route("/upload", name="upload_image")
     * @Method({"POST"})
     */
    public function uploadImageAction(Request $request)
    {
        $file = $request->files->get('file');
        $imagesDir = $this->container->getParameter('kernel.root_dir').'/../web/uploads/products';
        $fileName = md5(uniqid()).'.'.$file->guessExtension();
        $file->move($imagesDir, $fileName);
        
        return new JsonResponse(['status' => 'ok', 'image_url' => $fileName]);
    }
    
}
